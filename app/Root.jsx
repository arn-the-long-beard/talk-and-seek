import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './features/Routes/private/Route'
import AdminRoute from './features/Routes/admin/Route'

import NotFound from './features/NotFoundPage'

import ContextProvider from '../ContextProvider'
import AppBar from './features/Session/features/AppBar/index'
import SignUp from './features/Session/public/features/SignUp/SignUp'

import MyProfile from './features/Profile/admin/ProfilePage'
import Profile from './features/Profile'
import SearchPage from './features/Search/SearchPage'
import Footer from './features/BottomSide/Footer'
import TestsScreen from './features/Tests/TestsScreen'
import Policy from './features/Tests/policy'
import University from './features/Tests/university'
import Organization from './features/Tests/organization'
import Developers from './features/Tests/developers'
import Careers from './features/Tests/careers'
import About from './features/Tests/about'
import Language from './features/Tests/language'
import Ads from './features/Tests/ads'
import Help from './features/Tests/help'
import Login from './features/Tests/login'
import Student from './features/Tests/student'
import Cookies from './features/Tests/cookies'
import Home from './features/Tests/home'
const Root = ({ store, Router, location, context }) => (

  <Provider store={store}>
    <Router location={location} context={context}>
      <ContextProvider context={context}>
        <div>
          <AppBar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/language' component={Language} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/about' component={About} />
            <Route exact path='/careers' component={Careers} />
            <Route exact path='/developers' component={Developers} />
            <Route exact path='/policy' component={Policy} />
            <Route exact path='/ads' component={Ads} />
            <Route exact path='/cookies' component={Cookies} />
            <Route exact path='/help' component={Help} />
            <Route exact path='/student' component={Student} />
            <Route exact path='/university' component={University} />
            <Route exact path='/organization' component={Organization} />
            <Route exact path='/profile/:id' component={Profile} />
            <AdminRoute exact path='/myprofile' component={MyProfile} />
            <Route exact path='/testyourscreen' component={TestsScreen} />
            <Route exact path='/search' component={SearchPage} />
            <Route component={NotFound} />
          </Switch>
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
