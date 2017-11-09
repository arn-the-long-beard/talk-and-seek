import React from 'react'
import ReactDOMServer from 'react-dom/server'

import { StaticRouter } from 'react-router-dom'
import {Helmet} from 'react-helmet'
import Template from './template'

import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

// import Auth from './app/Auth.js'
// import injectTapEventPlugin from 'react-tap-event-plugin'
// import {refreshUser} from './app/actions/actions'
import configureStore from './app/store/configureStore'
import Root from './app/Root'
import {checkCookie, setInvalidateUser} from './server/store/setPreloadStore'
import {promisesCollecteur} from './server/store/promisesCollecteur'
import initReactFastclick from 'react-fastclick'
initReactFastclick()
// injectTapEventPlugin()
export default function serverRenderer ({ clientStats, serverStats }) {
  return (req, res, next) => {
    // cookie.plugToRequest(req, res)

// TODO no client rendering if no cookie maybe
    console.log('URL REQUEST IS ' + req.method + ' --' + req.url)
    const muiTheme = getMuiTheme({userAgent: req.headers['user-agent']})
    const css = []
    const context = {
      insertCss: (styles) => css.push(styles._getCss()),
      status: 0

    }
    const helmet = Helmet.renderStatic()
    let store = configureStore()
    let html = ReactDOMServer.renderToString(<MuiThemeProvider muiTheme={muiTheme}><Root store={store} Router={StaticRouter} location={req.url} context={context} /></MuiThemeProvider>)
    console.log('Server rendering')
      //  console.log(req.headers)
    let finalState = store.getState()
// TODO make it a middleware maybe
    finalState.host = {server: req.headers.host }
    promisesCollecteur(finalState, promises => {
      if (promises.length === 0) {
        console.log('there is no promise')
        render(res, context, css, html, helmet, finalState)
      } else {
        console.log('there are few promises to solve')
        Promise.all(promises)
              .then(() => {
                html = ReactDOMServer.renderToString(<MuiThemeProvider muiTheme={muiTheme}><Root store={store} Router={StaticRouter} location={req.url} context={context} /></MuiThemeProvider>)
                console.log('Server rendering Number 2')
                finalState = store.getState()

                render(res, context, css, html, helmet, finalState)
              })
              .catch((e) => {
                // handle errors here
                throw new Error('Error server side' + e.message)
              })
      }
    })
  }
// TODO make it a middleware maybe
  function render (res, context, css, html, helmet, finalState) {
    finalState = JSON.stringify(finalState)
    if (context.status === 404) {
      res.status(404).send(Template({css, html, helmet, finalState}))
    } else {
      res.status(200).send(Template({css, html, helmet, finalState}))
    }
  }
}
