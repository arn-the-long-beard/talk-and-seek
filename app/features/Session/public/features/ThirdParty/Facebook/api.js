import ServerAddress from '../../../../../Server/ServerAddres'
import request from 'superagent'
const validator = require('validator')
const url = () => { return ServerAddress.getServerUrl() }

class Api {
  static continueWithFacebook (data) {
    let credentials = {accessToken: data.accessToken, tokenId: data.tokenId, profile: data.profileObj }
    return request.post(url() + '/auth/continueWithFacebook')
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
