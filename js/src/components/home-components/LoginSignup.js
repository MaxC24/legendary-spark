import React, { Component } from 'react';
import userCtx from '../../context/user-context';
import { Link } from 'react-router-dom';

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

    async componentDidMount(){
        await this.props.userCtx.userIsAuthenticated();
        await this.props.setPreferences();
    }

    inputChange(key, e) {
        this.setState({
            [key]: e.target.value
        });
    }

    async login() {
        const { login } = this.props.userCtx;
        await login(this.state.loginEmail, this.state.loginPassword)
        await this.props.setPreferences();
    }

    async signup() {
        const { signup } = this.props.userCtx;
        await signup(this.state.signupEmail, this.state.signupPassword)
        await this.props.setPreferences();
    }

    render() {
        const { user, logout } = this.props.userCtx;
        if(user) {
            return(
                <div className="auth-forms">
                    {
                        user.firstName ?
                        <div>{user.firstName} </div> :
                        <div>{user.email}</div>

                    }
                    <Link to="profile"><button>Profile</button></Link>
                    { user.isAdmin ? <Link to="admin-page"><button>Admin</button></Link>: null }
                    <button onClick={ logout }>Logout</button>
                </div>
            );
        }
        return( 
            <div className="auth-forms">
                <div className="auth-form">
                    <input type="text"
                           onChange={(e) => this.inputChange('loginEmail', e)} 
                           value={this.state.loginEmail} 
                           placeholder="Email"/>
                    <input type="text"
                           onChange={(e) => this.inputChange('loginPassword', e)} 
                           value={this.state.loginPassword} 
                           type="password" 
                           placeholder="Password"/>
                    <button onClick={() => this.login()}>Login</button>
                </div>
                <div className="auth-form">
                    <input type="text"
                           onChange={(e) => this.inputChange('signupEmail', e)} 
                           value={this.state.signupEmail}  
                           placeholder="Email"/>
                    <input onChange={(e) => this.inputChange('signupPassword', e)} 
                           value={this.state.signupPassword} 
                           type="password" 
                           placeholder="Password"/>
                    <button onClick={() => this.signup()}>Signup</button>
                </div>
            </div>
        )
    }
}

export default userCtx.consumer(LoginSignup);