import React from 'react';

class PetCreator extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <div>Create a Pet:</div>
                <form onSubmit={() => {}}>
                    <input type="text" placeholder="Name"/>
                    <input type="text" placeholder="Breed" />
                    <input type="text" placeholder="Species" />
                    <input type="text" placeholder="Price" />
                    <input type="file" />
                </form>
            </div>
        )
    }
}

export default PetCreator;