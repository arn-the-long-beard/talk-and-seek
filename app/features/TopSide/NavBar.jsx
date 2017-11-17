import React, { Component} from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import PropTypes from 'prop-types'
import styles from './styles/nav.scss'
import { NavLink } from 'react-router-dom'
class NavBar extends Component {
  render () {
    return (
      <nav role='navigation'> <div className={styles.nav}>
        <div className={styles.itemsgroupleft}>
          <NavLink className={styles.itemlink} to='/' exact activeStyle={{
            fontWeight: 'bold',
            color: '#015367'
          }}>Home</NavLink>
          <NavLink className={styles.itemlink} to='/language' activeStyle={{
            fontWeight: 'bold',
            color: '#015367'
          }}>Language</NavLink>
          <NavLink className={styles.itemlink} to='/about' activeStyle={{
            fontWeight: 'bold',
            color: '#015367'
          }}>About</NavLink>
        </div>
        <div>
          <NavLink className={styles.itemlink} to='/help' activeStyle={{
            fontWeight: 'bold',
            color: '#015367'
          }}>Help</NavLink>
          <NavLink className={styles.itemlink} to='/talk' activeStyle={{
            fontWeight: 'bold',
            color: '#015367'
          }}>Talk and seek</NavLink>
        </div></div></nav>
    )
  }
}

NavBar.contextTypes = {
  insertCss: PropTypes.func,
  router: PropTypes.object.isRequired
}

export default withStyles(styles)(NavBar)
