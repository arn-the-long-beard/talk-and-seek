import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import NotFound from './features/NotFoundPage'
import ContextProvider from '../ContextProvider'
import Home from 'features/Tests/home'
import About from './features/Tests/about'
import Language from './features/Tests/language'

const Root = ({ store, Router, location, context }) => (

  <Provider store={store}>
    <Router location={location} context={context}>
      <ContextProvider context={context}>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/language' component={Language} />
            <Route exact path='/about' component={About} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </ContextProvider>
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  Router: PropTypes.func.isRequired
}

export default Root
