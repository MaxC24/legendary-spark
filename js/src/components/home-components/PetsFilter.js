import React, { Component } from 'react';
import PetCard from './PetCard';
import { createFilterOptions } from './utils/filter';
import Select from '../generic-componets/Select';

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

    selectOption(prop, e) {
        console.log(e.target.value)
        this.setState({
            [prop]: e.target.value
        })
    }

    render() {
        let pets = this.filterPets(this.props.pets);
        let { breedsOptions, speciesOptions } = createFilterOptions(this.props.pets);
        return (
            <React.Fragment>
                <Select options={breedsOptions}
                        selected={this.state.breed}
                        selectOption={e => this.selectOption('breed', e)}/>
                <Select options={speciesOptions}
                        selected={this.state.species}
                        selectOption={e => this.selectOption('species', e)}/>
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