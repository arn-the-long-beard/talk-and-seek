import React, { Component } from 'react';
import  PropTypes from 'prop-types'

export default class ContextProvider extends Component {

  static propTypes = {
    children: PropTypes.node.isRequired,
    context: PropTypes.object.isRequired
  };

  static contextTypes = {
    insertCss: PropTypes.func,
    router: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    insertCss: PropTypes.func.isRequired,
    status: PropTypes.number.isRequired
  };

  getChildContext() {
    return this.props.context;
  }

  render() {
    return this.props.children;
  }

}