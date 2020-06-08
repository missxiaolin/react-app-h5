import React from 'react'
import App from '../view/App/index'
import { BrowserRouter, Route, Switch } from 'react-router-dom'


const AppRouter = () => {
    return <BrowserRouter>
            <Switch>
                <Route path='/' component={App} ></Route>
            </Switch>
        </BrowserRouter>
}

export default AppRouter