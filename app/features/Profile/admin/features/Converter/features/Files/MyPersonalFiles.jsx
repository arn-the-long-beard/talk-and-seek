import React, { Component} from 'react'

import {connect} from 'react-redux'
import MyFiles from './components/FilesList'

class MyPersonalFiles extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.download = this.download.bind(this)
    this.condition = this.condition.bind(this)
  }
  componentDidMount () {

  }

  download (event, id) {
    event.preventDefault()
 //   this.props.actions.downloadFile(id)
  };

  condition (f) {
    return f.isConverted
  }
  render () {
    if (this.props.task.items) {
      return (
        <div>                                                                                                                                                                                                                                                                                                                                                                                    <MyFiles files={this.props.task.items} download={this.download} condition={this.condition} /></div>

      )
    }
  }
}
function mapStateToProps (state) {
  const {task } = state.profile.myProfile.converter

  return {
    task
  }
}
function mapDispatchToProps (dispatch) {
  return {
   // actions: bindActionCreators(downloadFileActions, dispatch),
   // converterActions: bindActionCreators(convertPDFActions, dispatch)
  }
}

export default connect(mapStateToProps)(MyPersonalFiles)
