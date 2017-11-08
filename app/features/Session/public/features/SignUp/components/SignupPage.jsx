
import React from 'react'

import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import SignUpForm from './SignUpForm'
import ParticleNetworkAnim from '../../../../../Animation/components/ParticleNetwork'
import styles from '../styles/styles.scss'
import { Helmet } from 'react-helmet'

const SignupPage = ({
                      onSubmit,
                      onChange,
                      errors,
                      credentials,
                      isValid,
                        handleResponse
                    }) => (
                      <div className={styles.container}><ParticleNetworkAnim />
                        <Helmet
                          title='Signup'
                        />
                        <div>

                          <h1 className={styles.title}>Welcome to SportIn Global</h1>
                          <p className={styles.vision}>The global sport Network.<br />
                            <br />
                      Where your relevant background<br />
    gives you a competitive edge.
  </p>
                          <SignUpForm
                            onSubmit={onSubmit}
                            onChange={onChange}
                            errors={errors}
                            credentials={credentials}
                            isValid={isValid}
                            styles={styles}
                            handleResponse={handleResponse}
                  /> </div></div>)
SignupPage.contextTypes = {
  insertCss: PropTypes.func
}
SignupPage.Proptypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
  isValid: PropTypes.bool.isRequired
}

export default withStyles(styles)(SignupPage)
