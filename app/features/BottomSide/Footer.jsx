import React, { Component} from 'react'

import styles from './styles/footer.scss'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { NavLink } from 'react-router-dom'
import LogoList from '../Platform/Technologies/LogoList'
class Footer extends Component {
  render () {
    return (<footer role='footer'> <LogoList /><div className={styles.container}>
      <div className={styles.itemsgroupleft}>
        <NavLink className={styles.itemlink} to='/' activeStyle={{
          fontWeight: 'bold',
          color: 'blue'
        }}>Home</NavLink>
        <NavLink className={styles.itemlink} to='/language' activeStyle={{
          fontWeight: 'bold',
          color: 'blue'
        }}>Language</NavLink>
        <NavLink className={styles.itemlink} to='/about' activeStyle={{
          fontWeight: 'bold',
          color: 'blue'
        }}>About</NavLink>

      </div>
      <div>
        <NavLink className={styles.itemlink} to='/help' activeStyle={{
          fontWeight: 'bold',
          color: 'blue'
        }}>Help</NavLink>
        <NavLink className={styles.itemlink} to='/talk' activeStyle={{
          fontWeight: 'bold',
          color: 'blue'
        }}>Talk and seek</NavLink>
      </div>
      <h3 className={styles.title}> Assignement for Convertelligence</h3>
      <p className={styles.title}> ©2017 Arnaud Menant. All rights reserved</p></div></footer>)
  }
}

Footer.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(Footer)

/*
<CopyRightTEXT/>

 */
