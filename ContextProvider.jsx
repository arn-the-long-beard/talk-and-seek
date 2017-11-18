import { Component } from 'react'
import PropTypes from 'prop-types'

export default class ContextProvider extends Component {
  getChildContext () {
    return this.props.context
  }

  render () {
    return this.props.children
  }
}
ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
  context: PropTypes.object.isRequired
}

ContextProvider.contextTypes = {
  insertCss: PropTypes.func,
  router: PropTypes.object.isRequired
}
ContextProvider.childContextTypes = {
  insertCss: PropTypes.func.isRequired,
  status: PropTypes.number.isRequired
}
