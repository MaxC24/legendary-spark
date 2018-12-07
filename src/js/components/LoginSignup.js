import React, { Component } from 'react'

class LoginSignup extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginEmail: '',
            loginPassword: '',
            signupEmail: '',
            signupPassword: ''
        }
    }

    inputChange(key, e) {
        this.setState({
            [key]: e.target.value
        });
    }

    render() {
        return( 
            <div>
                <div>
                    <input onChange={(e) => this.inputChange('loginEmail', e)} value={this.state.loginEmail} />
                    <input onChange={(e) => this.inputChange('loginPassword', e)} value={this.state.loginPassword} />
                    <button onClick={() => this.props.login(this.state.loginEmail, this.state.loginPassword)}>Login</button>
                </div>
                <div>
                    <input onChange={(e) => this.inputChange('signupEmail', e)} value={this.state.signupEmail} />
                    <input onChange={(e) => this.inputChange('signupPassword', e)} value={this.state.signupPassword} />
                    <button onClick={() => {}}>Signup</button>
                </div>
            </div>
        )
    }
}

export default LoginSignup;