import React from 'react'
import PropTypes from 'prop-types'

import { Card, CardText } from 'material-ui/Card'

import Ads from '../../../Ads/Ads'

import { Chip, Paper, Toggle } from 'material-ui'
import Star from 'material-ui/svg-icons/toggle/star'
import Completed from 'material-ui/svg-icons/action/done'
import Localize from 'material-ui/svg-icons/maps/place'
import Dollar from 'material-ui/svg-icons/editor/attach-money'

import UserBigAvatar from './UserBigAvatar'
import {blue300, transparent} from 'material-ui/styles/colors'

import Education from '../features/Education/Education'
import PdfConverter from '../features/Converter/PdfConverter'
import { Helmet } from 'react-helmet'

const MyProfile = ({
  user, addEducation
}) => (
  <div>
    <Helmet
      title='My Profile'
    />
    <Ads />
    <Paper zDepth={1} >
      <Toggle label='Private Policy' defaultToggled labelPosition='right' /><div><Star />
        <h4>All Star</h4>
        <h4>Logo Company</h4></div>
      <UserBigAvatar />
      <Completed />
    </Paper>
    <Paper zDepth={1} >
      <h3>{user.first_name}                                                                                                                                                                                                                                                                                                                                                                                              {user.familly_name} </h3>
      <b><i>Founder & CEO of SportIn Global</i></b>
      <div><Localize />Molde, Norway</div>
      {user.values &&
      <div>{user.values.map(function (value) {
        return (<Chip>{value}</Chip>)
      })}</div>}
      <Chip backgroundColor={blue300}>Passion</Chip>
      <Chip backgroundColor={blue300}>Knowledge</Chip>
      <Chip backgroundColor={blue300}>Unique</Chip>
      <b> <p><b>Goal :</b>Create and develop a successful startup </p>
        <p>Life Motto; " if your day doesn't challenge you, don't ever expect to be changed by it</p>
      </b>

      <p>                                                                                                                                                                                                                                                                                                                                                                                              <b>Bio :</b>I am a Frenchman. I do love food and swimming Test</p>
      <div><Card><Dollar /><p>Personnality Test results : Hexaco test ? </p>
        <p>EQ Score - Emotional Intelligence 2.0 Travis Bradberry</p></Card></div>
    </Paper>

    <Education />

    <PdfConverter />

  </div>
)

MyProfile.propTypes = {
  user: PropTypes.object.isRequired
}

export default MyProfile
