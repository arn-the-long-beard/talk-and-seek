import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/education.scss'
import PropTypes from 'prop-types'
import Add from 'material-ui/svg-icons/content/add'

import { Card, Chip, IconButton, Paper } from 'material-ui'
import EducationCard from './EducationCard'
const EducationFrame = ({educations, addEducation, editEducation, removeEducation}) => (<Paper zDepth={1}> <h3>Education:</h3>
  <span>
    <IconButton touch tooltip='Add' onClick={addEducation} >
      <Add />
    </IconButton>
  </span>

  {educations &&
  <div>{educations.map(function (education) {
    if (!education.isEditing) {
      return (<EducationCard key={education.content._id} education={education.content} editEducation={editEducation} />)
    }
  })}</div>}
</Paper>)

EducationFrame.propTypes = {
  insertCss: PropTypes.func,
  educations: PropTypes.array
}
export default withStyles(styles)(EducationFrame)
