import ServerAddress from '../../../../../Server/ServerAddres'
import request from 'superagent'
const validator = require('validator')
const url = () => { return ServerAddress.getServerUrl() }

class Api {
  static connect () {
    return new Promise((resolve, reject) => {
      var liRoot = document.createElement('div')
      liRoot.id = 'linkedin-root'

      document.body.appendChild(liRoot);

      (function (d, s, id) {
        const element = d.getElementsByTagName(s)[0]
        const ljs = element
        var js = element
        if (d.getElementById(id)) {
          return
        }
        js = d.createElement(s)
        js.id = id
        js.src = '//platform.linkedin.com/in.js'
        js.text = 'api_key: 7863emate4s9z1'
        ljs.parentNode.insertBefore(js, ljs)
      }(document, 'script', 'linkedin-sdk'))
      resolve({success: true})
    })
  }
  static removeAll () {

  }

  static logout () {
    IN.User.logout(this.removeAll)
  }
  static callbackFunction () {
    return new Promise((resolve, reject) => {
      IN.API.Profile('me').fields('id', 'first-name', 'last-name', 'headline', 'location', 'picture-url', 'public-profile-url', 'email-address').result((r) => {
        console.log(r)
        resolve({success: true, user: r.values[0]})
      }).error((err) => {
        console.log(err)
        reject(err)
      })
    })
  }

  static authorize (callback) {
    IN.User.authorize(callback, '')
  }

  static refresh () {
    IN.User.refresh()
  }

  static continueWithLinkedin (credentials) {
    return request.post(url() + '/auth/continueWithlinkedIn')
      .type('form')
      .send(credentials)
      .then((res, err) => {
        if (err) {
          console.log(err)
        }
        console.log(res.status)
        if (res) {
          return res.body
        }
      })
  }
}
  // static continueWithLinkedin (code) {

//      .type('form')
//     const url = {grant_type : 'authorization_code' , code: code, redirect_uri : 'https://localhost:3000/signup',client_id:'7863emate4s9z1',client_secret:'a6dY6j6DGGXLDcqA' }
//     return request.post('https://www.linkedin.com/oauth/v2/')
//       .send('grant_type=authorization_code')
//       .send('code='+code)
//       .send('redirect_uri =https://localhost:3000/signup')
//       .send('client_id=7863emate4s9z1')
//       .send('client_secret=a6dY6j6DGGXLDcqA')
//       .set('Content-Type', 'application/x-www-form-urlencoded')
//       .set('Access-Control-Allow-Origin','*')
//       .set('Host', 'www.linkedin.com')
//       .then((res, err) => {
//         if (err) {
//           console.log(err)
//         }
//         console.log(res.status)
//         if (res) {
//           return res.body
//         }
//       })
//   }
// }
//grant_type=authorization_code&code=AQSivODLbdgVMIO-QTc0L2U9qTSTFPNsV21IUiGwCR_aY_oGdOmIRQMzXTf5gIjG5z47t9s-tRlFsUFgalTsFkP1-CXD3mRQNGIBDjio3Y5o-GP9HHnwF-blNQq4AepjhiWtSDWHBK6wkKkI_qvAZLklB69Fbg&redirect_uri =https://localhost:3000/signup&client_id=7863emate4s9z1&client_secret=a6dY6j6DGGXLDcqA
export default Api
