import Cookies from 'js-cookie'

export default function authFetch(url, options) {
    options = options || {};
    options.headers = options.headers ? {...options.headers} : {};
    let token = Cookies.get('token');
    if(token) options.headers['Authorization'] = "Token " + token;
    return fetch(url, options)
}