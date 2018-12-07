import React, { Component } from 'react';
import PetCard from './PetCard';

export default class PetsFilter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            breed: '',
            species: ''
        }
    }

    filterPets(pets) {
        return pets.filter(pet => {
            return (pet.breed === this.state.breed || this.state.breed === '') && 
                   (pet.species === this.state.species || this.state.species === '')
        })
    }

    render() {
        let pets = this.filterPets(this.props.pets);
        return (
            <React.Fragment>
                {
                    pets.map(pet => {
                        return <PetCard key={pet.name} 
                                        pet={pet} 
                                        togglePreference={() => this.props.togglePreference(pet.id)}
                                        preferences={this.props.preferences} />
                    })
                }
            </React.Fragment>)
    }
}