import React from 'react';
import { adminCreatePet } from '../../utils/api';

class PetCreator extends React.Component {

    constructor(props){
        super(props);
        this.state = this.initialState;
    }

    get initialState(){
        return {
            name: '',
            breed: '',
            species: '',
            price: '',
            age: '',
            picture: null,
            adoption: false
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

    resetFileInput(){
        this.refs.fileInput.value = '';
    }

    async createPet(e) {
        e.preventDefault();
        let formData = new FormData();

        for(let key in this.state) {
            formData.append(key, this.state[key]);
        }

        let newPet = await adminCreatePet(formData);
        this.props.addPet(newPet);
        this.resetFileInput();
        this.setState(this.initialState);
    }

    render() {
        return (
            <div className="pet-creator-form">
                <div>CREATE A PET:</div>
                <form  id="form" onSubmit={e => this.createPet(e)}>
                    <input type="text" 
                           placeholder="* Name"
                           onChange={e => this.onInputChange('name', e)}
                           required
                           value={this.state.name}/>
                    <input type="text" 
                           placeholder="* Age (Number)"
                           onChange={e => this.onInputChange('age', e)}
                           pattern="\d+\s*?" required
                           value={this.state.age}/>
                    <input type="text" 
                           placeholder="* Breed"
                           onChange={e => this.onInputChange('breed', e)} 
                           required
                           value={this.state.breed}/>
                    <input type="text" 
                           placeholder="* Species"
                           onChange={e => this.onInputChange('species', e)}
                           required
                           value={this.state.species}/>
                    <input type="text" 
                           placeholder="Price (Number with max 2 decimal points)"
                           onChange={e => this.onInputChange('price', e)}
                           pattern="\d+\.?\d{1,2}\s*?"
                           value={this.state.price}/>
                    <div className="pet-creator-last-row">
                        <div>
                            <label>Adoption</label>
                            <input type="checkbox" 
                                    onChange={e => this.onCheckboxChange(e)} 
                                    selected={this.state.adoption}/>
                        </div>
                        <input ref="fileInput"
                            type="file"
                            onChange={e => this.onFileInputChange(e)}  required
                            files={this.state.picture}/>
                        <a href="#form"><button type="submit">Create Pet</button></a>
                    </div>
                </form>
            </div>
        )
    }
}

export default PetCreator;