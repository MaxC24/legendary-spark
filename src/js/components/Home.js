import React from 'react'
import { getPets, login } from '../utils/api'
import { getUser, removeUser } from '../utils/user-service'
import LoginSignup from './LoginSignup'

class Home extends React.Component {

    constructor() {
        super()
        this.state = {
            pets: [],
            user: null
        }
    }

    async componentDidMount() {
        let user = getUser();
        console.log(user)
        let pets = await getPets();
        this.setState({ pets, user })
    }

    async login(email, password) {
        let user = await login(email, password)
        this.setState({ user });
    }

    async logout() {
        removeUser();
        this.setState({user: null});
    }

    render() {
        return(
            <div>
                <LoginSignup user={this.state.user} 
                             login={(email, password) => login(email, password) }
                             logout={() => logout()} />
                {
                    this.state.pets.map(pet => {
                        console.log(pet)
                    })
                }
            </div>
        )
    }
}

export default Home;