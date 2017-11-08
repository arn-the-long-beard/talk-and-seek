export function insertItemAtEnd (array, item) {
  var index = array.length
  console.log('INSERTION')

  return [
    ...array.slice(0, index),
    item,
    ...array.slice(index)
  ]
}
export function insertItems (array, items) {
  return [
    ...array.slice(0, 0),
    items,
    ...array.slice(0)
  ]
}

export function removeItemById (array, itemId) {
  return array.filter(it => it._id !== itemId)
}

