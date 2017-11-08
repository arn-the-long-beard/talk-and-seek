import request from 'superagent'
import Auth from '../../../../Auth/auth'
import ServerAddress from '../../../../Server/ServerAddres'
const url = () => { return ServerAddress.getServerUrl() }
class SessionApi {
  static login (credentials) {
    return request.post(url() + '/auth/login')
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

  // TODO NEED CHANGE
  static authLogin () {
    return request.get(url() + '/auth/authlogin')
      .set({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Auth.getToken()})
      .then((res) => {
        return res.body
      })
  }
}

export default SessionApi
