import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import NotFound from './features/NotFoundPage'
import ContextProvider from '../ContextProvider'
import Home from './features/Tests/home'
import About from './features/Tests/about'
import Help from './features/Tests/help'
import Talk from './features/Talk-and-seek/'
import Language from './features/Tests/language'
import Footer from './features/BottomSide/Footer'
import {Helmet} from 'react-helmet'
const Root = ({ store, Router, location, context }) => (

  <Provider store={store}>
    <Router location={location} context={context}>
      <ContextProvider context={context}>
        <div>
          <Helmet>
            <meta charSet='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <html lang='en' />
            <html dir='ltr' />
          </Helmet>
          <main role='main'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/language' component={Language} />
              <Route exact path='/help' component={Help} />
              <Route exact path='/talk' component={Talk} />
              <Route exact path='/about' component={About} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
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
