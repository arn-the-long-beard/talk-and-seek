import React, { Component} from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from './actions'
import SeekResultsList from './components/SeekSection'

class Seek extends Component {
  /**
   * Class constructor.
   */
  constructor (props, context) {
    super(props, context)
    this.onChange = this.onChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.props.actions.checkIfNeedToAskWikipedia()
  }

  componentDidMount () {
    this.props.actions.checkIfNeedToAskWikipedia()
  }

  onChange (event) {
    event.preventDefault()
    this.props.actions.updateMaxResults(event.target.value)
  }

  /**
   * Render the component.
   */
  render () {
    return (
      <SeekResultsList results={this.props.seek.items}
        update={this.props.seek.lastUpdated}
        message={this.props.seek.message}
        isRequesting={this.props.seek.isRequesting}
        maxResults={this.props.seek.maxResults}
        onChange={this.onChange}
      />)
  }
}

Seek.contextTypes = {
  router: PropTypes.object.isRequired
}

Seek.propTypes = {
  seek: PropTypes.object.isRequired
}
function mapStateToProps (state) {
  const { seek } = state.talkAndSeek

  return {
    seek
  }
}
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Seek)
