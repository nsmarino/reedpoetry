import React from 'react'
import { NavLink } from 'react-router-dom'
const Header = () => {
    return (
      <header>
      <NavLink exact activeClassName="active" to="/">
        <p>Reed Memorial Library Presents</p>
        <h1>Collaborative Poetry</h1>
        </NavLink>
      </header>
    )
  }

export default Header