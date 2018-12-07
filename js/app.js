import '../styles/index.styl';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './src/components/Home';
import Admin from './src/components/Admin';
import FourOFour from './src/components/FourOFour';
import userCtx from './src/context/user-context';

let App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/admin' component={Admin}/>
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