import cookie from 'react-cookies'
// TODO ONLY FOR DEV
class ServerAddress {
  /**
   * Save the ip of the server when connected the first time
   *
   * @param {string} token
   */
  static saveIp (ip) {
    if (ip === undefined) {
      return null
    }
    cookie.save('address', ip, { path: '/' })
  }

  /**
   * Check if a user is authenticated - check if a token is saved in Local Storage
   *
   * @returns {boolean}
   */
  static isServernAddressSaved () {
    return cookie.load('address') !== undefined
  }

  /**
   * Deauthenticate a user. Remove a token from Local Storage.
   *
   */
  static deleteIpAddress () {
    cookie.remove('address', { path: '/' })
  }

  /**
   * Get a token value.
   *
   * @returns {string}
   */

  static getAddress () {
    let token = cookie.load('address')
    if (token === undefined) {
      this.deleteIpAddress()
    }

    return token
  }
  static getServerUrl () {
    return 'https://' + ServerAddress.getAddress()
  }
}

export default ServerAddress
