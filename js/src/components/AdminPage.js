import React, { Component } from 'react';
import PetCreator from './admin-components/PetCreator';
import PetList from './admin-components/PetList';
import UserList from './admin-components/UserList';
import { adminGetPets, adminGetUsers, adminDeletePet } from '../utils/api';
import { Link } from 'react-router-dom';

class Admin extends Component {
    constructor(props){
        super(props);
        this.state = {
            pets: [],
            users: []
        }
    }

    async componentDidMount() {
        let pets = await adminGetPets();
        let users = await adminGetUsers();
        this.setState({pets, users});
    }

    addPet(pet) {
        this.setState({
            pets: [...this.state.pets, pet]
        })
    }

    async removePet(id) {
        await adminDeletePet(id)
        this.setState({
            pets: this.state.pets.filter(pet => pet.id !== id)
        })
    }

    render() {
        return(
            <div className="admin-page">
                <Link to=''><button>Back</button></Link>
                <PetCreator addPet={(pet) => this.addPet(pet)} />
                <div className="admin-list">
                    <div>PET LIST</div>
                    <PetList pets={this.state.pets} 
                            removePet={(id) => this.removePet(id)}/>
                </div>
                <div className="admin-list">
                    <div>USER LIST</div>                
                    <UserList pets={this.state.pets} users={this.state.users} />
                </div>
            </div>
        )
    }
}

export default Admin;