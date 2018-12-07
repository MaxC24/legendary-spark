import fetch from './fetch';
import api from './api-endpoints';
import Cookies from 'js-cookie'

export async function login(email, password) {
    let loginResponse = await fetch(api.login, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: email, password: password})
    })
    let tokenObj = await loginResponse.json();
    if(!tokenObj.token) throw new Error('wrong auth')
    //set token so it can be assigned to the http headers;
    Cookies.set('token', tokenObj.token)
    let authResponse = await fetch(api.auth);
    let user =  await authResponse.json();
    Cookies.set('user', user);
    return user;
}

export async function signup(email, password) {
    let response = await fetch(api.signup, {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        })
    });
    return response.json();
}

export async function isAuthenticated(){
    let response = await fetch(api.isAuthenticated);
    return response.json();
}

export async function getPets() {
    let response = await fetch(api.pet);
    return response.json();
}

export async function toggleLikePet(id) {
    let response = await fetch(api.likePet, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            petId: id
        })
    });
    return response.json();
}

export async function getPreferences() {
    let response = await fetch(api.preference);
    return response.json();
}

export async function adminCreatePet(data) {
    let response = await fetch(api.adminPet, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: data
    })
    return response.json();
}

export async function adminGetPets() {
    let response = await fetch(api.adminPet);
    return response.json();
}

export async function adminGetUsers() {
    let response = await fetch(api.adminUser);
    return response.json();
}

export async function adminDeletePet(id) {
    let response = await fetch(`${api.adminPet}/${id}`, {
        method: "DELETE"
    })
    return response.json();
}