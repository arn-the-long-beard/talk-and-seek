export const promisesCollecteur = (finalState, next) => {
  console.log('---------------- Store state-------------')
  console.log(finalState)
  var promises = []
  var keys = Object.keys(finalState)

  keys.forEach(function (key) {
    console.log(finalState[key])

    if (finalState[key].isFetching && finalState[key].promise) {
      console.log('something is fetching and there is a promise to add to the list')
      promises.push(finalState[key].promise)
    } else {
      var subkeys = Object.keys(finalState[key])

      subkeys.forEach((subkey) => {
        console.log(subkey)
        if (finalState[key][subkey].isFetching && finalState[key][subkey].promise) { promises.push(finalState[key][subkey].promise) }
      })
    }
  })
  console.log(' There are ' + promises.length + '  promise(s)')
  return next(promises)
}

