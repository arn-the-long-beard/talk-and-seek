import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/education.scss'
import PropTypes from 'prop-types'
import Remove from 'material-ui/svg-icons/content/remove'
import Edit from 'material-ui/svg-icons/editor/mode-edit'
import { Card, Chip, IconButton, Paper } from 'material-ui'

const EducationCard = ({education, editEducation, removeEducation}) => (
  <Card>
    {education.logo &&
    <div>Logo</div>}
    <b><h4>{education.degree.degree_id.title}                                                                                                                                                                                                                                                                                                                                                                                              {education.program.program_id.title}</h4></b>
    <p>{education.program.program_id.university}</p>
    <div>{new Date(education.from).toDateString()} --- {new Date(education.to).toDateString()} </div>

    <Chip className={styles.tooltip}><span className={styles.tooltiptext}>{education.main_grade}</span></Chip>
    <Chip>{education.honors}</Chip>
    <Chip>{education.awards}</Chip>
    <IconButton touch tooltip='Edit' onClick={((e) => editEducation(e, education._id))} >
      <Edit />
    </IconButton>
    <IconButton touch tooltip='Remove' onClick={removeEducation} >
      <Remove />
    </IconButton>
  </Card>)

EducationCard.propTypes = {
  insertCss: PropTypes.func
}
export default withStyles(styles)(EducationCard)
