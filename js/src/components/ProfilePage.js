import React, { Component } from 'react';
import userCtx from '../context/user-context';
import { updateProfile } from '../utils/api';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class ProfilePage extends Component {
    constructor(){
        super();
        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            phone: ''
        }
    }

    componentDidMount() {
        let user = this.props.userCtx.user;
        this.setState(user);
    }

    onInputChange(prop, e) {
        this.setState({
            [prop] : e.target.value
        })
    }

    async update() {
        let { updateUser } = this.props.userCtx;
        await updateProfile(this.state);
        await updateUser(this.state);
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="profile-page">
                <Link to="/"><button>Back</button></Link>
                <div className="profile-form">
                    <label>First Name</label>
                    <input type="text"
                        onChange={(e) => this.onInputChange('firstName', e)} 
                        value={this.state.firstName}/>
                    <label>Last Name</label>
                    <input type="text"
                            onChange={(e) => this.onInputChange('lastName', e)} 
                        value={this.state.lastName}/>
                    <label>Address</label>
                    <input type="text"
                            onChange={(e) => this.onInputChange('address', e)} 
                        value={this.state.address}/>
                    <label>Phone</label>
                    <input type="text"
                            onChange={(e) => this.onInputChange('phone', e)} 
                        value={this.state.phone}/>
                    <button onClick={() => this.update()}>Update</button>
                </div>
            </div>
        )
    }
}

export default userCtx.consumer(withRouter(ProfilePage));