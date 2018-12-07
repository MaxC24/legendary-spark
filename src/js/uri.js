let uri = process.env.NODE_ENV === 'production' ? 
    'https://hungry-pets-project.herokuapp.com':
    'http://localhost:8000';

export default uri;