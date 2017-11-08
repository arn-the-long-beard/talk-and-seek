/*

<Ads>
<UserMediumMiddleFrame>
<UserCard>
<DataPolicyToggleSwitch/>
<UserBigAvatar/>
<ValidationButton/> ??
<OrganizationBigLogo/>
<AlLStarIcon/>
<AllStarLabel/>
<UserTinyFrame/>

<UserSmallFrame>
<UserNameTitle/>
<UserDescription/>
<UserLocation/>
<UserValuesList>
X<UserValue/>
<UserSkillSet/>
<UserMission/>
<UserBioLabel/>
<UserBioText/>

<ScoringCard>
<DollarIcon/>
<UserTestName/>
</ScoringCard>

<UserSmallFrame/>
<UserMediumMiddleFrame/>

<UserMediumMiddleFrame>

<UserCustomFrame>
<EducationLabel/>

<EducationDeleteButton/>
<EducationAddButton/>
<EducationEditButton/>
<EducationCardsList>
X<EducationCards>
<UniversityLogo/>
<ProgramTitle/>
<UniversityTitle>
<DateFromToText>
<UniversityAddress>
<GPAButton> ????
<HonorsButton> ???
<AwardsButton> ???
</EducationCards>
</EducationCardsList

<ProfessionalExperienceLabel/>
<ExperienceAddButton/>
<ExperienceEditButton/>
<ExperienceCardsList>
X<ExperienceCards>
<OrganizationLogo/>
<PositionTitle/>
<OrganizationTitle>
<DateFromToText>
<OrganizationAddress>
<TaskChipsList>
3*<TaskChip/>
</ExperienceCards>
</ExperienceCardsList

 */
import React, { Component} from 'react'
import PropTypes from 'prop-types'

import cookie from 'react-cookies'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import MyProfile from './components/MyProfile'
import Loader from '../../../components/Spinner/Loader'
class MyProfilePage extends Component {
  /**
   * Class constructor.
   */
  constructor (props, context) {
    super(props, context)

    const storedMessage = cookie.load('successMessage')
    let successMessage = ''
    if (storedMessage) {
      successMessage = storedMessage
      cookie.remove('successMessage')
    }
    this.state = {
      secretData: '',
      errors: {},
      successMessage
    }
  }
  componentDidUpdate (prevProps) {
// action refresh with user data

    this.props.actions.getMyProfilerIfNeeded(this.props.myProfile)
  }
  componentWillUpdate (nextProps) {
    if (nextProps.user && nextProps.myProfile.content) {
      if (nextProps.user._id !== nextProps.myProfile.content._id) {
        this.props.actions.invalidateUser(nextProps.user)
      }
    }
  }

  /**
   * This method will be executed after initial rendering.
   */

  componentDidMount () {
// action refresh with user data
    this.props.actions.getMyProfilerIfNeeded(this.props.myProfile)
  }

  /**
   * Render the component.
   */
  render () {
    if (this.props.myProfile.didInvalidate) {
      return (<Loader />)
    } else if (this.props.user && this.props.myProfile.content) {
      return (<div><MyProfile id='user'
        user={this.props.user}
        />
      </div>)
     // else if (this.props.user._id === this.props.myProfile.content._id) {
     //    return (<div><MyProfile id='user'
     //      user={this.props.user}
     //    />
     //    </div>)
     //  }
    } else {
      return (<Loader />)
    }
  }
}

MyProfilePage.contextTypes = {
  router: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  console.log(state)
  const { user } = state.session.connected.login
  const { myProfile} = state.profile.myProfile
  return {
    user, myProfile
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyProfilePage)
