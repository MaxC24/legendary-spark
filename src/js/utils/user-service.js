import Cookies from 'js-cookie'

export function getUser(){
    let cookieUser = Cookies.get('user');
    if(cookieUser) {
        return JSON.parse(cookieUser); 
    } else {
        return null;
    }
}

export function removeUser() {
    Cookies.remove('user');
    Cookies.remove('token')
}