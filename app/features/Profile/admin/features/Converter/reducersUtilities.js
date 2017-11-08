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

/*
function removeItem(array, item) {

  return [
    ...array.slice(0, action.index),
    ...array.slice(action.index + 1)
  ];
}
*/
/*
function removeItemById (array, itemId) {
  return array.map(item => {
    if (item._id !== itemId) {
      // This isn't the item we care about - keep it as-is
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      members: item.members.filter(member => member._id !== itemId)

    }
  })
}
*/
