import styled from 'styled-components'
import {NavLink} from 'react-router-dom'

export const Nav = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
`
export const NavItem = styled.li`
  margin-right: 10px;
`
export const NavLinkComponent = styled(NavLink)`
  text-decoration: none;
  padding: 5px 10px;
  border: 2px solid #eee;
  border-radius: 5px;
  transition: all ease .3s;
  &.active {
    border-color: #ef6c00;
    font-weight: bolder;
  }
`