
// TODO Split later into different files and Improve
export const checkCookie = (req, next) => {
  try {
    let state = req.cookies['state']
    if (state) {
      console.log('the state cookie is in the req')
      return next(null, JSON.parse(state))
    } else {
      return next(null, null)
    }
  } catch (e) {
    console.error(e)
    return next(e, null)
  }
}

export const preparePreload = (state) => {
  if (state.key && state.maxResults) {
    console.log('-----hydrate state---------' + state.key + '---' + state.maxResult)
    let talkAndSeek = {seek: { didInvalidate: true, maxResults: state.maxResults, key: state.key, items: [], isRequesting: false, preloaded: true }}
    return {talkAndSeek}
  } else return null
}

// TODO Split later into different files and Improve
// export const checkCookieAddress = (req, next) => {
//   let cookieToken = req.cookies['address']
//   if (cookieToken) {
//     console.log('the token cookie is in the req')
//     next(setCookieAddressIfNeeded(cookieToken))
//   } else {
//     next(removeCookieAddressIfNeeded())
//   }
// }
//
// function setCookieAddressIfNeeded (cookieIp) {
//   if (ServerAddress.getAddress() === cookieIp) {
//     console.log('cookie already registred, no need to save')
//   } else {
//     console.log('save the cookie')
//     var setCookie = cookieTool.serialize('address', cookieIp)
//     cookie.setRawCookie(setCookie)
//   }
// }
// function removeCookieAddressIfNeeded () {
//   if (ServerAddress.getAddress()) {
//     console.log('remove cookie')
//     ServerAddress.deleteIpAddress()
//     return false
//   }
//   console.log('no cookieIp to remove')
// }
/*
*facebook strategy : loading a bit of data and inject it inside the html and make the javascript client side asking for more
*
*
*
*
 *//*
const preloadSessionSucces = json => {
  return {session: { isFetching: false,
    logged: true,
    user: json.user,
    message: json.message,
    didInvalidate: false}}
}
const preloadSessionFailed = json => {
  return {session: { isFetching: false,
    logged: false,
    err: json.errors,
    message: json.message,
    didInvalidate: false}}
}

export function fetchPreloadUser (next) {
  Api.authLogin().then(response => {
    if (response.success) {
      next(preloadSessionSucces(response))
    } else {
      next(preloadSessionFailed(response))
      //  Auth.authenticateUser(response.token)
    //  next(authLoginSuccess(response))
    }
  }).catch(error => {
    throw (error)
  })
}

export const preloadGetUniversitiesFailed = (json) => {
  return {
    err: json.errors,
    message: json.message
  }
} */
/*
export const preloadGetUniversitiesRequest = () => {
  return {
  //  type: types.GET_UNIVERSITIES_REQUEST,
  }
} */

/*
export const preloadGetUniversitiesSuccess = (json) => {
  return {
    user: json.user,
    message: json.message,
    receivedAt: Date.now()
  }
}
export function getPreloadUniversities (next) {
  universitiesApi.getUniversities().then(response => {
    if (response.success) {
      next(preloadGetUniversitiesSuccess(response))
    } else {
      next(preloadGetUniversitiesFailed(response))
      //  Auth.authenticateUser(response.token)
      //  next(authLoginSuccess(response))
    }
  }).catch(error => {
    throw (error)
  })
}
*/
