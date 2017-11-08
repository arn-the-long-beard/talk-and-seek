import React from 'react'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import Auth from '../../Auth/auth'
import ErrorBoundary from '../../Tests/ErrorBoundary'
const AdminRoute = ({ component: Component, ...rest }) => {
  /*
if(   Auth.isUserAuthenticated()){
  console.log(' the user is authenticated for the private route')

}
else{
  console.log(' the user is not authenticated for private route')
} */
  return (
    <ErrorBoundary>
      <Route {...rest} render={props => (
// Add admin check maybe from paramsId and SessionID and Token
      Auth.isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/forbidden',
          state: { from: props.location }
        }} />
      )
    )} />
    </ErrorBoundary>
  )
}

export default AdminRoute
