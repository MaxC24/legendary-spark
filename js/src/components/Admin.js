import React, { Component } from 'react';
import PetCreator from './PetCreator';

class Admin extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <PetCreator />
            </div>
        )
    }
}

export default Admin;