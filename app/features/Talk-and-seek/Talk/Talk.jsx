
import React, { Component} from 'react'
import PropTypes from 'prop-types'
import MiniLoader from './../../../components/Spinner/miniLoader'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'

import TalkForm from './components/TalkForm'

class  Talk extends Component {

  constructor (props, context) {
    super(props, context)
    this.start=this.start.bind(this)
    this.onEnd=this.onEnd.bind(this)
  }
  onEnd = () => {
    this.props.actions.stopRecording()
  }
  onResult = ({ finalTranscript }) => {
    const result = finalTranscript
    console.log(finalTranscript)
    this.props.actions.validateData(result)
  }


  start(e) {
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


// import React, { Component} from 'react'
// import PropTypes from 'prop-types'
// import MiniLoader from './../../../components/Spinner/miniLoader'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'
// import * as actions from './actions'
// import ReadMyVoice from './components/ReadMyVoice'
// import TalkForm from './components/TalkForm'
//
// class Talk extends Component {
//   /**
//    * Class constructor.
//    */
//   constructor (props, context) {
//     super(props, context)
//
//     this.state = {
//       record: false
//     }
//
//     // TODO possible to use autobind decorator
//     this.startRecording = this.startRecording.bind(this)
//     this.stopRecording = this.stopRecording.bind(this)
//     this.onStop = this.onStop.bind(this)
//     this.onResult = this.onResult.bind(this)
//
//   }
//   componentDidMount () {
//     if (Window && !this.props.talk.isReady) {
//       this.props.actions.renderMicrophone()
//     }
//   }
//   componentWillReceiveProps (nexProps) {
//     if (!nexProps.talk.isRecording && nexProps.talk.hasStopped) {
//       this.props.actions.checkIfNeedtoSendData()
//     }
//   }
//   startRecording () {
//     this.props.actions.startRecording()
//   }
//   stopRecording () {
//     this.props.actions.stopRecording()
//   }
//
//   onStop (recordedBlob) {
//     console.log('recordedBlob is: ', recordedBlob)
//     this.props.actions.getData(recordedBlob)
//   }
//
//   onResult  ({ finalTranscript }) {
//     const result = finalTranscript
//     console.log(finalTranscript)
//     // this.setState({ start: false })
//     // this.props.action('result')(finalTranscript)
//   }
//
//   /**
//    * Process the form.
//    *
//    * @param {object} event - the JavaScript event object
//    */
//   /**
//    * Render the component.
//    */
//   render () {
//     if (this.props.talk.isReady && process.env.IS_BROWSER)
//     {
//       return (
//         <TalkForm record={this.props.talk.record}
//           errors={this.props.talk.errors}
//           onStop={this.onResult}
//           isRecording={this.props.talk.isRecording}
//           startRecording={this.startRecording}
//                   stop={this.props.talk.hasStopped}
//           stopRecording={this.stopRecording}
//         />)
//     } else {
//       return (<MiniLoader />)
//     }
//   }
// }
//
// Talk.contextTypes = {
//   router: PropTypes.object.isRequired
// }
//
// Talk.propTypes = {
//   talk: PropTypes.object.isRequired
// }
// function mapStateToProps (state) {
//   const { talk } = state.talkAndSeek
//
//   return {
//     talk
//   }
// }
// function mapDispatchToProps (dispatch) {
//   return {
//     actions: bindActionCreators(actions, dispatch)
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Talk)
/*
 *    <audio ref='audioSource' controls='controls' src={this.props.talk.data.blobURL} /> */
/*
   <TalkForm record={this.props.talk.record}
          errors={this.props.talk.errors}
          onStop={this.onStop}
          isRecording={this.props.talk.isRecording}
          startRecording={this.startRecording}
          stopRecording={this.stopRecording}
        />
                  {this.props.talk.data &&
          <ReadMyVoice url={this.props.talk.data.blobURL} />}
        }</div>
 */