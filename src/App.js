
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import SignIn from './components/signIn'
import { Provider } from 'react-redux'

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={SignIn}/>
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default App; 