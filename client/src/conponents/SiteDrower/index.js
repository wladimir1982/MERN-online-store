import React from 'react'
import {NavLink} from 'react-router-dom'
import ListItem from '@material-ui/core/es/ListItem/ListItem'
import Drawer from '@material-ui/core/es/Drawer/Drawer'

import {Content, TextBtn} from './style'

const SiteDrower = ({open, onClose}) => {
  const closeDrower = () => {
    onClose(false)
  }

  return (
    <Drawer
      open={open}
      onClose={closeDrower}
    >
      <Content>
        <ListItem button>
          <NavLink
            style={{textDecoration: 'none'}}
            to="/logout"
          >
            <TextBtn>Logout</TextBtn>
          </NavLink>
        </ListItem>
      </Content>
    </Drawer>
  )
}

export default SiteDrower