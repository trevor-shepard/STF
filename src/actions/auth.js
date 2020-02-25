export const reAuthenticateUser = (credentials) => {
    return async (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase()
        const user = firebase.auth().currentUser
        var cred = firebase.auth.EmailAuthProvider.credential(
            credentials.email, credentials.password);
        user.reauthenticateWithCredential(cred).then(function() {
            // User re-authenticated.
            dispatch({ type: "REAUTH_SUCCESS", user})
          }).catch(function(error) {
            // An error happened.
            dispatch({ type: "REAUTH_FAILURE", error})
          });
    }
}
export const signIn = (credentials) => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        try {
            const firebase = getFirebase()
            const db = getFirestore()
            const userID = await firebase.auth().signInWithEmailAndPassword(
                credentials.email,
                credentials.password,
            ).then( async (resp) => { 
                return resp.user.uid
            }).catch(err => {
                dispatch({ type: "LOGIN_ERROR", err})
            })
            const profile = await db.collection('users')
                .doc(userID)
                .get()
                .then(doc => {
                    return doc.data()
                })
            dispatch({ type: "LOGIN_SUCCESS", profile})
        } catch(err) {
            console.log(err)
            dispatch({ type: "LOGIN_ERROR", err})
        }
    }
}

export const signOut = () => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        try {
            await firebase.auth().signOut()
        } catch (e) {
            console.log(e)
        }
        return dispatch({ type: "SIGNOUT_SUCCESS" })
    }
}


// export const signUp = (email, password, firstName, lastName, user_type, total_properties) => {
//     return async (dispatch, getState, { getFirebase, getFirestore }) => {
//         try {
//             const firebase = getFirebase()
//             const firestore = getFirestore()
//             const uid = await firebase.auth().createUserWithEmailAndPassword(
//                 email,
//                 password,
//             ).then((resp) => {
//                 return resp.user.uid
//             })
//             const user_name = `${firstName} ${lastName}`
//             const profile = {
//                 user_name,
//                 email,
//                 user_type,
//                 total_properties,
//                 properties: [],
//                 inspections: [],
//                 active_properties: 0,
//                 id: uid,
//                 ID:uid, 
//             }
//             await firestore.collection("users").doc(uid).set({
//                 ...profile
//             })
//             dispatch({ type: "SIGNUP_SUCCESS", profile })
            
//         } catch (error) {
//             dispatch({ type: "SIGN_UP_ERROR", error })
//         }
//     }
// }

export const checkIfUserExists = () => {
    return async (dispatch, getState, { getFirebase, getFirestore }) => {
        const state = getState()
        const db = getFirestore()
        const firebase = getFirebase()
        try {
            const userID = state.firebase.auth.uid
            const profile = await db.collection('users')
                .doc(userID)
                .get()
                .then(doc => doc.data())
            return dispatch({ type: "LOGIN_DETECTED", profile})
        } catch (e) {
            firebase.auth().signOut().then(() => {
                dispatch({ type: "SIGNOUT_SUCCESS" })
            })
            return dispatch({ type: "SIGNOUT"})
        }
    }
}

export const updateUser = (data, password) => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase()
        const db = getFirestore()
        const user = await firebase.auth().currentUser
        try {
            if (password) {
                await user.updatePassword(password)
            }
            await db.collection('users').doc(user.uid).update(data)
            const profile = await db.collection('users')
                .doc(user.uid)
                .get()
                .then(doc => {
                    return doc.data()
                })
            return dispatch({ type: "UPDATE_USER", profile })  
        } catch(error) {
            console.log(error)
        }
    } 
}