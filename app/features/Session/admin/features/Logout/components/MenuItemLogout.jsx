
import React from 'react'
import protypes from 'prop-types'
import { MenuItem } from 'material-ui'

const MenuItemLogout = ({logOut}) => (
  <MenuItem key='logout' primaryText='Logout' onClick={logOut} />
)

MenuItemLogout.Prototypes = {
  logOut: protypes.func.isRequired
}

export default MenuItemLogout
