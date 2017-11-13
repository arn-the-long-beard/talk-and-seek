import React from 'react'
import expressLogo from './logos/expresslogo.png'
import nodejsLogo from './logos/nodejslogo.png'
import reactLogo from './logos/reactlogo.jpg'
import reduxLogo from './logos/reduxlogo.png'
import standardLogo from './logos/standardjslogo.png'
import uimaterialLogo from './logos/uimateriallogo.png'
import webpackLogo from './logos/webpacklogo.png'
import PropTypes from 'prop-types'
import styles from './styles/list.scss'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
const LogoList = () => (<div className={styles.container}>
  <ul className={styles.list}>
    <li className={styles.li}> <img className={styles.img} src={expressLogo} alt='My logo1' /></li>
    <li className={styles.li}> <img className={styles.img} src={nodejsLogo} alt='My logo2' /></li>
    <li className={styles.li}> <img className={styles.img} src={reactLogo} alt='My logo2' /></li>
    <li className={styles.li}> <img className={styles.img} src={reduxLogo} alt='My logo2' /></li>
    <li className={styles.li}> <img className={styles.img} src={standardLogo} alt='My logo2' /></li>
    <li className={styles.li}> <img className={styles.img} src={uimaterialLogo} alt='My logo2' /></li>
    <li className={styles.li}> <img className={styles.img} src={webpackLogo} alt='My logo2' /></li>
  </ul>

</div>)

LogoList.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(LogoList)
