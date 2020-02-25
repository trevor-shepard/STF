const profileReducer = (state = null, action) => {
    switch(action.type) {
        case 'LOGIN_ERROR':
            return state
        case "LOGIN_DETECTED":
            return action.profile
        case "LOGIN_SUCCESS":
            return action.profile
        case "USER_UPDATED":
            return action.profile
        case "SUBSCRIPTION_UPDATED":
            return action.profile
        case "SIGNOUT_SUCCESS":
            return null;
        case "SIGNUP_SUCCESS":
            return action.profile
        case "UPDATE_USER":
            return action.profile
        case "SIGNUP_ERROR":
            return null
        default: 
            return state
    }
}

export default profileReducer