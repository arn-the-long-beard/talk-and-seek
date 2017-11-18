import React from 'react'
import {Route} from 'react-router-dom'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './OtherPages/styles/styles.scss'
const Status = ({ code, children }) => (
  <Route render={({ staticContext }) => {
    if (staticContext) {
      staticContext.status = code
    }
    return children
  }} />
)
const NotFound = () => (
  <Status code={404}>
    <div className={styles.container}>
      <h1 className={styles.text} >Sorry, can’t find that.</h1>
    </div>
  </Status>
)

export default withStyles(styles)(NotFound)
