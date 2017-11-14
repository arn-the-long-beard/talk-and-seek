import React from 'react'
import PropTypes from 'prop-types'
import MiniLoader from './../../../../components/Spinner/miniLoader'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/styles.scss'
import Search from 'material-ui/svg-icons/action/search'
import ResultsList from './SeekResults'
import SeekSettingsMenu from './SeekSettingsMenu'
import {blue500} from 'material-ui/styles/colors'

// Todo when using external link, lost the reduxe state
const ResultsSection = ({results, update, message, isRequesting, maxResults, onChange}) => (

  <section className={styles.container}>
    <div><h4 className={styles.titleSection}> Seek into Wikikpedia <Search color={blue500} /></h4></div>
    <SeekSettingsMenu maxResults={maxResults} onChange={onChange} />
    {update &&
    <div className={styles.label}>
              Last updated at {new Date(update).toLocaleTimeString()}.
    {' '}
    </div>}
    { message && <div className={styles.label}> {message} </div> }
    {isRequesting &&
    <MiniLoader />}
    <ResultsList results={results} />
  </section>)

ResultsSection.propTypes = {
  results: PropTypes.array.isRequired,
  isRequesting: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  maxResults: PropTypes.number.isRequired
}

ResultsSection.contextTypes = {
  insertCss: PropTypes.func
}

export default withStyles(styles)(ResultsSection)
