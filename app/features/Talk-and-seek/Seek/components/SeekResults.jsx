import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import { List, ListItem } from 'material-ui/List'

// Todo when using external link, lost the reduxe state
const ResultsList = ({results}) => (

  <List className={styles.list} >
    {results.map(function (item) {
      return (
        <ListItem disabled key={item.raw.pageid} ><div>
          <a target='_blank' rel='noopener noreferrer' href={item.raw.fullurl} ><span><h4 className={styles.titleResult}>{item.raw.title}</h4>-{item.raw.pagelanguage}</span></a>
          <br />
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
