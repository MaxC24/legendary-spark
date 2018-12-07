import './styles/index.styl';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './js/components/Home'
import FourOFour from './js/components/FourOFour'

let App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route component={FourOFour}/>
            </Switch>
        </React.Fragment>
    )
}

render((
    <BrowserRouter>
        <App/>
    </BrowserRouter>
), document.getElementById('app'))