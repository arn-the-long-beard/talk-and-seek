import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from '../styles/education.scss'
import PropTypes from 'prop-types'
import DatePicker from 'material-ui/DatePicker'

import { Card, Chip, IconButton, Paper, RaisedButton, TextField } from 'material-ui'
import AutoCompleteSearch from '../../../../../../components/Edit/Autocomplete'

const EducationCard = ({errors, education, onSubmit, onChange, onChangeFrom, onChangeTo}) => (
  <Card>
    <form action='/' onSubmit={onSubmit} method='post'>
      <h2 className='card-heading'>Sign Up</h2>
      {errors.summary && <p className='error-message'>{errors.summary}</p>}
      <TextField
        id='university'
        floatingLabelText='University'
        name='university'
        onChange={onChange}
        errorText={errors.university}
        value={education.program.university}
        hintText='University'
        />

      <TextField
        id='program'
        floatingLabelText='Program'
        name='program'
        errorText={errors.program}
        onChange={onChange}
        value={education.program.name}
        hintText='Program'
        />
      <TextField
        id='degree'
        floatingLabelText='Degree'
        name='degree'
        errorText={errors.degree}
        onChange={onChange}
        value={education.degree.title}
        hintText='Degree'
        />
      <TextField
        id='grade'
        floatingLabelText='Grade'
        name='grade'
        onChange={onChange}
        errorText={errors.grade}
        value={education.grade}
        hintText='Grade'
        />
      <TextField
        id='awards'
        floatingLabelText='Awards'
        name='awards'
        onChange={onChange}
        errorText={errors.awards}
        value={education.awards}
        hintText='Awards'
        />
      <TextField
        id='honors'
        floatingLabelText='Honors'
        name='honors'
        onChange={onChange}
        errorText={errors.honors}
        value={education.honors}
        hintText='Honors'
        />
      <DatePicker hintText='From' container='inline' onChange={onChangeFrom} />
      <DatePicker hintText='To' container='inline' onChange={onChangeTo} />
      <RaisedButton type='submit' label='Save Education' primary />
    </form>
  </Card>)

EducationCard.propTypes = {
  insertCss: PropTypes.func,
  education: PropTypes.object,
  onSubmit: PropTypes.func,
  onChange: PropTypes.func,
  onChangeFrom: PropTypes.func,
  onChangeTo: PropTypes.func
}
export default withStyles(styles)(EducationCard)
