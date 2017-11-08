import { Helmet } from 'react-helmet'
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './styles/styles.scss'
import PropTypes from 'prop-types'
const Student = () => (
  <div className={styles.container}>
    <Helmet
      title='Student page'
    />
    <p className={styles.text}>For student</p>
  </div>
)
Student.contextTypes = {
  router: PropTypes.object.isRequired,
  insertCss: PropTypes.func
}

export default withStyles(styles)(Student)
