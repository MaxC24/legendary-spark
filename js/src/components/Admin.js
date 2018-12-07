import React, { Component } from 'react';
import PetCreator from './admin-components/PetCreator';
import PetList from './admin-components/PetList';
import UserList from './admin-components/UserList';
import { adminGetPets, adminGetUsers } from '../utils/api';
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
        console.log(pets, users);
        this.setState({pets, users});
    }

    addPet(pet) {
        this.setState({
            pets: [...this.state.pets, pet]
        })
    }

    render() {
        return(
            <div>
                <Link to=''><button>Back</button></Link>
                <PetCreator addPet={(pet) => this.addPet(pet)} />
                <PetList pets={this.state.pets} />
                <UserList pets={this.state.pets} users={this.state.users} />
            </div>
        )
    }
}

export default Admin;