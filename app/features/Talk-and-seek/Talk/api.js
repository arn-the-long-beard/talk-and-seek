
class Api {
  static extractKeyWord (data) {
    return new Promise((resolve, reject) => {
      if (!data) {
        return reject(new Error({error: 'no transcription returned'}))
      } else if (data === '') {
        return resolve({success: false, message: 'no transcription returned'})
      } else {
        let n = data.split(' ')

        let key = n[n.length - 1]
        return resolve({success: true, message: 'keyword valid and extracted', data, key})
      }
    })
  }

  static checkWebBrowser () {
    return new Promise((resolve, reject) => {
      try {
        const SpeechRecognition = window.SpeechRecognition ||
          window.webkitSpeechRecognition ||
          window.mozSpeechRecognition ||
          window.msSpeechRecognition ||
          window.oSpeechRecognition

        if (SpeechRecognition != null) {
          return resolve({success: true, message: 'You are using the correct web browser'})
        } else {
          console.warn('The current browser does not support the SpeechRecognition API.')
          return resolve({success: false, err: 'Please use Chrome as web browser ', message: 'Please use Chrome as web browser'})
        }
      } catch (e) {
        return reject(new Error(e))
      }
    })
  }
}

export default Api
