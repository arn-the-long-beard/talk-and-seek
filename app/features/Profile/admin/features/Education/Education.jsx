import React, { Component} from 'react'
import PropTypes from 'prop-types'

import cookie from 'react-cookies'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import EducationFrame from './components/EducationFrame'
import EducationForm from './components/EducationForm'
import EducationCard from './components/EducationCard'
import { IconButton, Paper } from 'material-ui'
import Add from 'material-ui/svg-icons/content/add'
class Education extends Component {
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
      successMessage,
      education: {
        program: {status : 'ProgramNotFound', name : '', university :'' , id:''},
        degree: {level : 'Bachelor'},
        grade: '',
        awards: '',
        honors: '',
        from: '',
        to: '',

      }
    }
    this.addEducation = this.addEducation.bind(this)
    this.editEducation = this.editEducation.bind(this)
    this.removeEducation = this.removeEducation.bind(this)

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)



    this.onChangeFrom = this.onChangeFrom.bind(this)

    this.onChangeTo = this.onChangeTo.bind(this)

  }

  addEducation = (event)=>{
    event.preventDefault()
    this.props.actions.openEditForm()
    //actions
  }
  removeEducation = (event)=>{
    event.preventDefault()
    //actions
  }
  editEducation = (event,id)=>{
    event.preventDefault()
    this.props.actions.openEditForm(id)
    //actions
  }


  onChange (event){
    event.preventDefault()
    const field = event.target.name
    const education = this.state.education
    education[field] = event.target.value
    return this.setState({education})
  }

  onChangeFrom (event, date){
    const education = this.state.education
    education.from = date.toJSON()
    return this.setState({education})
  }
  onChangeTo(event, date){
    const education = this.state.education
    education.to = date.toJSON()
    return this.setState({education})
  }
// .send({education : { to : education.to.toJSON(), from : education.from.toJSON()}})

  onSubmit(event){
    event.preventDefault()
    this.props.actions.addEducation(this.state.education)
  }

  /**
   * This method will be executed after initial rendering.

  /**
   * Render the component.
   */
  render () {

const {educations} = this.props
    if(educations.items) {/*
      return(
        <div>
          <EducationFrame educations = {educations.items} addEducation={this.addEducation} editEducation = {this.editEducation} removeEducation = {this.removeEducation}/>
          {educations.isEditing &&
          <EducationForm errors = {this.state.errors} education={this.state.education} onSubmit={this.onSubmit} onChange={this.onChange} onChangeFrom ={this.onChangeFrom} onChangeTo ={this.onChangeTo}/>}
        </div>
    )
  */
      return( <Paper zDepth={1}> <h3>Education:</h3>
        <span>
    <IconButton touch tooltip='Add' onClick={this.addEducation} >
      <Add />
    </IconButton>
</span>
        {educations.isEditing &&
        <EducationForm errors = {this.state.errors} education={this.state.education} onSubmit={this.onSubmit} onChange={this.onChange}/>}


        {educations.items &&
        <div>{educations.items.map((education) => {
          if(!education.isEditing){
            return (<EducationCard key={education.content._id} education={education.content} editEducation = {this.editEducation} removeEducation = {this.removeEducation} /> )
          }
          else{
            return (<EducationForm errors = {this.state.errors} education={education.content} onSubmit={this.onSubmit} onChange={this.onChange} onChangeFrom ={this.onChangeFrom} onChangeTo ={this.onChangeTo}/>)

          }

        })}</div>}
      </Paper>)
}
    else {
      return (<div>Educations</div>)
    }
  }
}


Education .contextTypes = {
  router: PropTypes.object.isRequired,

}

Education.propTypes = {
  educations: PropTypes.object.isRequired,
}
function mapStateToProps (state) {
  console.log(state)
  const {educations} = state.profile.myProfile
  return {educations}
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Education)


/*



         {  educations &&

      <EducationForm education = {educations.new} />
          <EducationFrame educations = {educations} addEducation={this.addEducation}/> }

 */