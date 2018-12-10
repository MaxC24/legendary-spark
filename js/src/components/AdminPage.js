import React, { Component } from 'react';
import PetCreatorEditor from './admin-components/PetCreatorEditor';
import PetList from './admin-components/PetList';
import UserList from './admin-components/UserList';
import { adminGetPets, adminGetUsers, adminDeletePet, adminCreatePet } from '../utils/api';
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

    replaceUpdatedPet(updatedPet) {
        this.setState({pets: this.state.pets.map( pet => {
            return updatedPet.id === pet.id ? updatedPet : pet;
        })});
    }

    async removeDeletedPet(id) {
        await adminDeletePet(id)
        this.setState({
            pets: this.state.pets.filter(pet => pet.id !== id)
        })
    }

    render() {
        return(
            <div className="admin-page">
                <Link to=''><button>Back</button></Link>
                <PetCreatorEditor afterAction={(pet) => this.addPet(pet)} 
                                  actionText="Create Pet"
                                  action={adminCreatePet}/>
                <div className="admin-list">
                    <div>PET LIST</div>
                    <PetList pets={this.state.pets} 
                            removeDeletedPet={(id) => this.removeDeletedPet(id)}
                            replaceUpdatedPet={ id => this.replaceUpdatedPet(id) }/>
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