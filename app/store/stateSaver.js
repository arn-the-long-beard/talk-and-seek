import cookie from 'react-cookies'

class StateSaver {
  /**
   * Save the redux state
   *
   * @param {object} state
   */
  static saveState (state) {
    const expires = new Date()
    expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
    if (StateSaver.isStoreSaved()) {
      StateSaver.cleanState()
    }
    cookie.save('state', state, {path: '/', expires: expires})
  }
  static isStoreSaved () {
    if (cookie.load('state')) {
      console.log(' cookie here')
      return true
    } else {
      console.log('no cookie')
      return false
    }
 //   return cookie.load('state') !== undefined
  }
  static cleanState () {
    cookie.remove('state', {path: '/'})
  }
  static getState () {
    return cookie.load('state')
  }
}

export default StateSaver
