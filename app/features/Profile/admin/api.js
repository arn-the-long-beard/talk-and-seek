
import request from 'superagent'
import Auth from '../../Auth/auth'
import ServerAddress from '../../Server/ServerAddres'

const url = () => { return ServerAddress.getServerUrl() }
class Api {
  static getMyContent () {
    return request.get(url() + '/api/admin/myprofile')
      .set({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + Auth.getToken()})
      .then((res) => {
        return res.body
      })
  }
}
export default Api
