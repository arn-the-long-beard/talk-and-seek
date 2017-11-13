
class SessionApi {
  // static send (data) {
  //   var form = new FormData()
  //   form.append(data)
  //   return request.post(url() + '/public/talk')
  //   .type('form')
  //     .send({data:data})
  //     // .attach('file', data.blob)
  //     // .on('progress', function (e) {
  //     //   console.log('Percentage done: ', e.percent)
  //     // })
  //     .then((res, err) => {
  //       if (err) {
  //         console.log(err)
  //       }
  //       console.log(res.status)
  //       if (res) {
  //         return res.body
  //       }
  //     })
  // }

  static extractKeyWord (data) {
    return new Promise((resolve, reject) => {
      if (!data) {
        return reject({error: 'no transcription returned'})
      } else if (data === '') {
        return resolve({success: false, message: 'no transcription returned'})
      } else {
        let n = data.split(' ')

        let key = n[n.length - 1]
        return resolve({success: true, message: 'keyword valid and extracted', data, key})
      }
    })
  }
}

export default SessionApi
