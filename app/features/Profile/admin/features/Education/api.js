
import request from 'superagent'
import Auth from '../../../../Auth/auth'
import ServerAddress from '../../../../Server/ServerAddres'
const url = () => { return ServerAddress.getServerUrl() }
class Api {
  static save (education) {
    return request.post(url() + '/api/admin/myprofile/education')
      .set({'Authorization': 'Bearer ' + Auth.getToken()})
      .set({'Content-Type': 'application/json'})
      .type('form')
      .send(education)
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

  static uploadCV (file) {
    var cv = new FormData()
    cv.append('file', file)
    // const headers = this.requestHeaders()
    return request.post(url() + '/api/private/myprofile/cv')
      .set({'Authorization': 'Bearer ' + Auth.getToken()})
      .send(cv)
      .on('progress', function (e) {
        console.log('Percentage done: ', e.percent)
      })
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

  // TODO NEED TO MAKE IT WORKING
  static download (id) {
    return request.get(url() + '/api/private/myprofile/cv/' + id)
      .set({'Authorization': 'Bearer ' + Auth.getToken()})

      .then((res, err) => {
        if (err) {
          console.log(err)
        }
        console.log(res.status)

        if (res) {
          // return res.body
          return res.text
        }
      })
  }
}
export default Api
