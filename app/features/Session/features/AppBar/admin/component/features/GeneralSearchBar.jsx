import React, { Component} from 'react'
import UniversitySearch from '../../../../../../Search/public/features/University/UniversitySearch'
import UserSearch from '../../../../../../Search/public/features/User/UserSearch'

class GeneralSearchBar extends Component {
  constructor () {
    super()
  }

  render () {
    return (<div><UniversitySearch /><UserSearch /></div>)
  }
}

export default GeneralSearchBar
