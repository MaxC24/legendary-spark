import React from 'react';

class PetCreatorEditor extends React.Component {

    constructor(props){
        super(props);
        this.state = this.initialState;
    }

    get initialState(){
        return this.updatingPet ? 
            {   
                name: this.props.pet.name,
                breed: this.props.pet.breed,
                species: this.props.pet.species,
                //.price is not required when creating a pet so if null we set it as an empty string
                price: this.props.pet.price || '',
                age: this.props.pet.age,
                adoption: this.props.pet.adoption
            } : {
                name: '',
                breed: '',
                species: '',
                price: '',
                age: '',
                adoption: false,
            }
    } 

    get updatingPet(){
        return !!this.props.pet;
    }

    onInputChange(prop, e) {
        this.setState({ [prop] : e.target.value });

    }

    onCheckboxChange(e) {
        this.setState({ adoption: e.target.checked })
    }

    onFileInputChange(e) {
        this.setState({ picture: e.target.files[0] })
    }

    changeFileInput(value){
        this.refs.fileInput.value = value;
    }

    async createUpdatePet(e) {
        e.preventDefault();
        let newPet, formData = new FormData();

        for(let key in this.state) {
            formData.append(key, this.state[key]);
        }
        if(this.updatingPet) {
            newPet = await this.props.action(formData, this.props.pet.id);
        } else {
            newPet = await this.props.action(formData);
            this.changeFileInput('');
            this.setState(this.initialState);
        }
        this.props.afterAction(newPet);
    }

    render() {
        return (
            <div className="pet-admin-form">
                <div>{`${this.props.actionText.toUpperCase()}:`}</div>
                <form  id="form" onSubmit={e => this.createUpdatePet(e)}>
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
                            onChange={e => this.onFileInputChange(e)}  
                            files={this.state.picture} />
                        <a href="#form"><button type="submit">{this.props.actionText}</button></a>
                    </div>
                </form>
            </div>
        )
    }
}

export default PetCreatorEditor;