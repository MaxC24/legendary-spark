import React, { Component } from 'react';
import PetCreatorEditor from './PetCreatorEditor';
import { adminUpdatePet } from '../../utils/api';

class PetList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            petEditable: null
        }
    }

    setPetEditable(id) {
        let petEditable = this.state.petEditable === id ? null : id;
        this.setState({
            petEditable
        });
    }

    render(){
        let {pets, removeDeletedPet } = this.props;
        let isEditablePetList = !!removeDeletedPet;
        return (
            <ul>
                {
                    pets.map(pet => {
                        return(
                            <li className="pet-row" key={pet.name}>
                                <div>{pet.name}</div>
                                <div>{pet.breed}</div>
                                <div>{pet.species}</div>
                                <img src={pet.picture} />
                                { pet.adoption ? <div>Adopt ME! </div> : <div>{`$${pet.price}`}</div> }
                                { isEditablePetList ? <button onClick={() => removeDeletedPet(pet.id)}>Delete</button> : null }
                                { isEditablePetList ? <button onClick={() => this.setPetEditable(pet.id)}>{this.state.petEditable === pet.id? 'Close': 'Edit'}</button> : null }
                                {
                                    this.state.petEditable === pet.id ?
                                    <PetCreatorEditor actionText="Edit Pet" 
                                                      pet={pet}
                                                      afterAction={(pet) => {
                                                          this.props.replaceUpdatedPet(pet);
                                                          this.setPetEditable();
                                                        }}
                                                      action={adminUpdatePet}/> : null
                                                      
                                }
                            </li>
                        )
                    }) 
                }
            </ul>
        )
    }
}

export default PetList;