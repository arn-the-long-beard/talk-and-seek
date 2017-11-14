import React, { Component} from 'react'
import styles from './styles/footer.scss'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LogoList from '../Platform/Technologies/LogoList'
class Footer extends Component {
  render () {
    return (<footer role='footer' className={styles.footer}> <LogoList />
      <div className={styles.container}>
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
