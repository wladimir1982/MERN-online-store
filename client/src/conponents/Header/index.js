import React from 'react'
import {NavLink} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import {indigo, lime, pink} from '@material-ui/core/colors'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import MenuIcon from '@material-ui/icons/Menu'


import {Nav, NavItem, NavLinkComponent} from './style'

const Header = ({onLeftIconClicked}) => {
  const token = localStorage.getItem('token')

  return (
    <AppBar
      position="fixed"
      style={
        token
          ? {background: pink["700"]}
          : {background: indigo.A100}
      }
    >
      <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h6" color="inherit" className="grow">
          <NavLink to="/categorieslist" style={{textDecoration: 'none', color: lime["50"]}}>
            Online Store
          </NavLink>
        </Typography>
        {
          token
            ? <Nav style={{display: 'flex', alignItems: 'center'}}>
              <NavItem>
                <NavLink
                  className="nav-item"
                  to="/categorieslist"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    color: lime["50"]
                  }}
                >
                  Category
                </NavLink>
              </NavItem>
              <NavItem>
                <IconButton
                  onClick={onLeftIconClicked}
                  className="menuButton"
                  color="inherit"
                  aria-label="Menu"
                >
                  <MenuIcon/>
                </IconButton>
              </NavItem>
            </Nav>
            : <Nav>
              <NavItem>
                <NavLinkComponent
                  to="/login"
                >
                  Log In
                </NavLinkComponent>
              </NavItem>
              <NavItem>
                <NavLinkComponent
                  to="/register"
                >
                  Sign In
                </NavLinkComponent>
              </NavItem>
            </Nav>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header