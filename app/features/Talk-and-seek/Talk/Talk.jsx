
import React, { Component} from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'

import TalkForm from './components/TalkForm'

class Talk extends Component {
  constructor (props, context) {
    super(props, context)
    // this.start = this.start.bind(this)
    // this.onEnd = this.onEnd.bind(this)
    // this.onResult = this.onResult.bind(this)
  }
  @autobind
  onEnd (){
    this.props.actions.stopRecording()
  }
  @autobind
  onResult ({ finalTranscript }) {
    const result = finalTranscript
    console.log(finalTranscript)
    this.props.actions.validateData(result)
  }
  @autobind
  start (e) {
    e.preventDefault()
    this.props.actions.startRecording()
  }

  render () {
    return (
      <TalkForm
        record={this.props.talk.record}
        start={this.start}
        onEnd={this.onEnd}
        errors={this.props.talk.errors}
        onResult={this.onResult}
        result={this.props.talk.data}
          />
    )
  }
}
Talk.contextTypes = {
  router: PropTypes.object.isRequired
}
Talk.propTypes = {
  talk: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { talk } = state.talkAndSeek

  return {
    talk
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Talk)
