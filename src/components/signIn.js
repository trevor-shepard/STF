import React, { Component} from 'react'
import { connect } from 'react-redux'
import {signIn} from '../actions/auth'


class SignIn extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: null,
            password: null
        }

        this.handleInput = this.handleInput.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInput(field) {
        return (e) => {
            this.setState({
                [field]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.signIn(this.state)
    }


    render() {
        return(
            <div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.error,
        auth: state.firebase.auth
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) =>  dispatch(signIn(creds)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
