import { Helmet } from 'react-helmet'
import React from 'react'
import MediaQuery from 'react-responsive'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
import Login from '../../features/Session/public/features/LogIn/LogIn'
const LoginPage = () => (
  <div className={styles.container}>
    <Helmet
      title='Login'
    />
    <p className={styles.text}>Thank you for registering. A confirmation Email has been sent <br />
    You can login after your checked your email
      <Login />
    </p>
  </div>
)
LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(LoginPage)
