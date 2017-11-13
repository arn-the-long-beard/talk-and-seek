import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import { List, ListItem } from 'material-ui'

// Todo when using external link, lost the reduxe state
const ResultsList = ({results}) => (

  <List className={styles.list} >
    {results.map(function (item) {
      return (
        <ListItem disabled key={item.raw.pageid} ><div>
          <a target='_blank' rel='noopener noreferrer' href={item.raw.fullurl} ><span className={styles.result} ><h4 className={styles.result}>{item.raw.title}</h4>-{item.raw.pagelanguage}</span></a>
        </div>
          <p className={styles.result}>{item.intro}</p>
        </ListItem>
      )
    })}
  </List>)

ResultsList.propTypes = {
  results: PropTypes.array.isRequired
}

ResultsList.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(ResultsList)
