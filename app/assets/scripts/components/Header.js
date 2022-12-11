import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <>
      <header>
        <div className="logo">
          <img src="./assets/images/happyhourDAO-logo-icon.svg" width="60" height="60" alt="Logo-Icon" />

          <span className="logo__version-text">v3.</span>
        </div>

        <div className="menu-content">
          <button className="connect-wallet-btn">Connect Wallet</button>

          <nav className="header-nav">
            <a className="header-nav__links">Home</a>
            <a className="header-nav__links">About</a>
            <a className="header-nav__links">Source</a>
            <a className="header-nav__links">More</a>
          </nav>
        </div>
      </header>
    </>
  )
}

export default Header
