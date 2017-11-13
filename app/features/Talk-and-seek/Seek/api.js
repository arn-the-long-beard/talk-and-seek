import wiki from 'wikijs'
class Api {
  static send (key, maxResults) {
    return wiki().search(key, maxResults).then((data) => {
      console.log(data.results)
      let items = []
      return new Promise((resolve, reject) => {
        data.results.map(function (item) {
          requestContent(item, (resultItem) => {
            items.push(resultItem)
            rejectIfRequestInvalid(items, data, reject)
            resolveIfRequestsCompleted(items, data, resolve)
          })
        })
      })
    })
  }
}
const requestContent = (item, next) => {
  wiki().page(item).then((dataItem) => {
    dataItem.content().then((text) => {
      let intro = ''
      try { intro = text.substr(0, 250) } catch (e) {}
      return next({raw: dataItem.raw, intro: intro})
    })
  })
}
const rejectIfRequestInvalid = (items, data, reject) => {
  if (data.results.length === 0) {
    return reject({
      success: false,
      message: 'we have found ' + data.results.length + ' articles, please reformulate your request'
    })
  }
}
const resolveIfRequestsCompleted = (items, data, resolve) => {
  if (items.length === data.results.length) {
    return resolve({
      success: true,
      items: items,
      message: 'we have found ' + data.results.length + ' articles'
    })
  }
}

export default Api
