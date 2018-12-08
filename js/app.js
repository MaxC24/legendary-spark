import '../styles/index.styl';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './src/components/HomePage';
import AdminPage from './src/components/AdminPage';
import ProfilePage from './src/components/ProfilePage';
import FourOFour from './src/components/FourOFourPage';
import userCtx from './src/context/user-context';

let App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path='/' component={HomePage}/>
                <Route exact path='/admin-page' component={AdminPage}/>
                <Route exact path='/profile' component={ProfilePage}/>
                <Route component={FourOFour}/>
            </Switch>
        </React.Fragment>
    )
}

App = userCtx.provider(App);

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'))