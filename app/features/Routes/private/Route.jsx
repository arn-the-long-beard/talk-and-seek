import React from 'react'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import Auth from '../../Auth/auth'

const PrivateRoute = ({ component: Component, ...rest }) => {
  /*
if(   Auth.isUserAuthenticated()){
  console.log(' the user is authenticated for the private route')

}
else{
  console.log(' the user is not authenticated for private route')
} */
  return (
    <Route {...rest} render={props => (

      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />
      )
    )} />
  )
}

export default PrivateRoute
