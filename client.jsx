import React from 'react'
import ReactDOM from 'react-dom'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import injectTapEventPlugin from 'react-tap-event-plugin'
import initReactFastclick from 'react-fastclick'
import { BrowserRouter } from 'react-router-dom'
// injectTapEventPlugin()

import configureStore from './app/store/configureStore'
import Root from './app/Root'
// add these console.log lines
initReactFastclick()

const context = {
  insertCss: () => {

  },

  status: 0
}

const preloadedState = window.__PRELOADED_STATE__
const store = configureStore(preloadedState)
ReactDOM.hydrate(<MuiThemeProvider muiTheme={getMuiTheme()}>
  <Root Router={BrowserRouter} context={context} store={store} />
</MuiThemeProvider>, document.getElementById('root'))
