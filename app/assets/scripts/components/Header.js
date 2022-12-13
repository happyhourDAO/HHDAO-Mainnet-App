import React, { useEffect } from "react"
import { NavLink } from "react-router-dom"

function Header() {
  let activeClassName = "header-nav__links--active"

  return (
    <>
      <header>
        <div className="logo">
          <img src="./assets/images/happyhourDAO-logo-icon.svg" width="60" height="60" alt="Logo-Icon" />

          <span className="logo__version-text">v3.</span>
        </div>

        <div className="menu-content">
          <button className="connect-wallet-btn">Connect</button>

          <nav className="header-nav">
            <NavLink to="/" className={({ isActive }) => "header-nav__links" + (isActive ? " header-nav__links--active" : "")}>
              Home
            </NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => "header-nav__links" + (isActive ? " header-nav__links--active" : "")}>
              App
            </NavLink>
            <NavLink to="/source" className={({ isActive }) => "header-nav__links" + (isActive ? " header-nav__links--active" : "")}>
              Source
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => "header-nav__links" + (isActive ? " header-nav__links--active" : "")}>
              About
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
