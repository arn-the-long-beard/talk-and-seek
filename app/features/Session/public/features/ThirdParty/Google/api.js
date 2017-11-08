import ServerAddress from '../../../../../Server/ServerAddres'
import request from 'superagent'
const validator = require('validator')
const url = () => { return ServerAddress.getServerUrl() }

// 807620094523-opp0gld59nfj7di0j92icph8f2ungl79.apps.googleusercontent.com
// 3Af8KvqUNiuC9n-t6npsEaZs
// AIzaSyBOWfQQo4mt_Im777htWyjPdoVYC3BxA-I
class Api {
  // static connect () {
  //   return new Promise((resolve, reject) => {
  //     var goRoot = document.createElement('div')
  //     goRoot.id = 'googleroot'
  //
  //     document.body.appendChild(goRoot)
  //     window.onLoadCallback = () => {
  //       resolve({success: true})
  //     }
  //
  //     (function (d, s, id) {
  //       const element = d.getElementsByTagName(s)[0]
  //       const ljs = element
  //       var js = element
  //       if (d.getElementById(id)) {
  //         return
  //       }
  //       js = d.createElement(s)
  //       js.id = id
  //       js.src = '//apis.google.com/js/api.js?onload=onLoadCallback'
  //       ljs.parentNode.insertBefore(js, ljs)
  //     }(document, 'script', 'google-sdk'))
  //   })
  // }
  // static init () {
  //   gapi.client.init({
  //     'apiKey': '3Af8KvqUNiuC9n-t6npsEaZs',
  //     // Your API key will be automatically added to the Discovery Document URLs.
  //     'discoveryDocs': ['https://people.googleapis.com/$discovery/rest'],
  //     // clientId and scope are optional if auth is not required.
  //     'clientId': '807620094523-opp0gld59nfj7di0j92icph8f2ungl79.apps.googleusercontent.com',
  //     'scope': 'profile'
  //   }).then(function () {
  //     // 3. Initialize and make the API request.
  //     return gapi.client.people.people.get({
  //       'resourceName': 'people/me',
  //       'requestMask.includeField': 'person.names'
  //     })
  //   }).then(function (response) {
  //     console.log(response.result)
  //   }, function (reason) {
  //     console.log('Error: ' + reason.result.error.message)
  //   })
  // }
  // // static logout () {
  // //   IN.User.logout(this.removeAll)
  // // }
  // static callbackFunction () {
  //   return new Promise((resolve, reject) => {
  //     gapi.client.init({
  //       'apiKey': 'AIzaSyBOWfQQo4mt_Im777htWyjPdoVYC3BxA-I',
  //       'clientId': '807620094523-opp0gld59nfj7di0j92icph8f2ungl79.apps.googleusercontent.com',
  //       'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
  //       'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
  //       // }).then(function () {
  //       //   return gapi.auth2.getAuthInstance();
  //
  //       // Listen for sign-in state changes.
  //       //  GoogleAuth.isSignedIn.listen('');
  //     }).then(() => {
  //       let GoogleAuth = gapi.auth2.getAuthInstance()
  //     //  GoogleAuth.isSignedIn.listen('');
  //       resolve({success: true, google: GoogleAuth})
  //     })
  //   })
  // }
  //
  // static authorize (callback) {
  //   return new Promise((resolve, reject) => {
  //     gapi.load('client', callback)
  //     resolve({success: true})
  //   })
  // }
  //
  // static refresh () {
  //   IN.User.refresh()
  // }

  static continueWithGoogle (data) {
    let credentials = {accessToken: data.accessToken, tokenId: data.tokenId, profile: data.profileObj }
    return request.post(url() + '/auth/continueWithGoogle')
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

export default Api
