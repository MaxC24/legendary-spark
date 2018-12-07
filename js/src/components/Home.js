import React from 'react'
import { getPets, getPreferences, toggleLikePet } from '../utils/api'
import LoginSignup from './home-components/LoginSignup'
import PetsFilter from './home-components/PetsFilter';
import userCtx from '../context/user-context'; 

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pets: [],
            preferences: []
        }
    }

    async componentDidMount() {
        let pets = await getPets();
        this.setState({ pets })
    }

    async togglePreference(id){
        console.log(id);
        await toggleLikePet(id);
        this.setPreferences();
    }

    async setPreferences() {
        if(!this.props.userCtx.user) return;
        let preferences = await getPreferences();
        this.setState({ preferences })
    }
    
    render() {
        return(
            <div>
                <h1>HUNGRY PETS</h1>
                <LoginSignup setPreferences={() => this.setPreferences()}/>
                <PetsFilter pets={this.state.pets}
                            togglePreference={(id) => this.togglePreference(id)}
                            preferences={this.state.preferences}/>
            </div>
        )
    }
}

export default userCtx.consumer(Home);