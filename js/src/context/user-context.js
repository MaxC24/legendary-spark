import createContext from 'react-ctx-state';
import Cookies from 'js-cookie';
import { login, signup, isAuthenticated} from '../utils/api';

const state = {
    user: null,
    isAuthenticated: false
}

const actions = {
    login: (email, password) => state => {
        return login(email, password)
        .then(user => {
            return { user }
        })
    },
    signup: (email, password) => state => {
        return signup(email, password)
        .then(user => {
            return { user }
        })
    },
    logout: () => state => {
        Cookies.remove('user')
        Cookies.remove('token')
        return {user: null}
    },
    userIsAuthenticated: () => state => {
        if(Cookies.get('user') && Cookies.get('token')){
            return isAuthenticated()
            .then(authenticated => {
                if(authenticated) {
                    return {...state, user : JSON.parse(Cookies.get('user')),
                            isAuthenticated: true};
                } else {
                    return {...state, user: null, 
                             isAuthenticated: false}
                }
            })
        } else {
            return { user: null, 
                     isAuthenticated: false}
        }
    },
    updateUser: (data) => state => {
        let updatedUser = {
            ...state.user,
            ...data
        }
        Cookies.remove('user');
        Cookies.set('user', updatedUser)
        return updatedUser
    }
}

export default createContext('userCtx', state, actions);
