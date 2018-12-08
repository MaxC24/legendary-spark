import React from 'react';
import { adminCreatePet } from '../../utils/api';

class PetCreator extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name: '',
            breed: '',
            species: '',
            price: '',
            age: '',
            picture: null
        }
    }

    onInputChange(prop, e) {
        this.setState({
            [prop] : e.target.value
        })
    }

    onCheckboxChange(e) {
        this.setState({
            adoption: e.target.checked
        })
    }

    onFileInputChange(e) {
        this.setState({
            picture: e.target.files[0]
        })
    }

    async createPet(e) {
        e.preventDefault();
        e.stopPropagation();
        let formData = new FormData();

        for(let key in this.state) {
            formData.append(key, this.state[key]);
        }

        let newPet = await adminCreatePet(formData);
        this.props.addPet(newPet);
    }

    render() {
        return (
            <div className="pet-creator-form">
                <div>CREATE A PET:</div>
                <div>
                    <input type="text" 
                           placeholder="Name"
                           onChange={e => this.onInputChange('name', e)}/>
                    <input type="text" 
                           placeholder="Age"
                           onChange={e => this.onInputChange('age', e)}/>
                    <input type="text" 
                           placeholder="Breed"
                           onChange={e => this.onInputChange('breed', e)} />
                    <input type="text" 
                           placeholder="Species"
                           onChange={e => this.onInputChange('species', e)} />
                    <input type="text" 
                           placeholder="Price"
                           onChange={e => this.onInputChange('price', e)} />
                    <div className="pet-creator-last-row">
                        <div>
                            <label>Adoption</label>
                            <input type="checkbox" 
                                    onChange={e => this.onCheckboxChange(e)} />
                        </div>
                        <input type="file"
                            onChange={e => this.onFileInputChange(e)}  />
                        <button onClick={e => this.createPet(e)}>Create Pet</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default PetCreator;