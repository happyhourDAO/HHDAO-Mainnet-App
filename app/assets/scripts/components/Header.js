import React, { useEffect, useRef, useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { IconContext } from "react-icons"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import MobileMenu from "./MobileMenu"
import { CSSTransition } from "react-transition-group"

function Header() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [isOpen, setOpen] = useState(false)
  const menuIconRef = useRef()
  const headerNavRef = useRef()

  function toggleMenu() {
    setOpen(!isOpen)
    menuIconRef.current.classList.toggle("menu-content__menu-icon--active")
    headerNavRef.current.classList.toggle("header-nav--expanded")

    if (appState.isMobileMenuOpen == false) {
      appDispatch({ type: "openMobileMenu" })
    } else {
      appDispatch({ type: "closeMobileMenu" })
    }
  }

  return (
    <>
      <header>
        <div className="logo">
          <img src="./assets/images/happyhourDAO-logo-icon.svg" width="60" height="60" alt="Logo-Icon" />

          <span className="logo__version-text">v3.</span>
        </div>

        <div className="menu-content">
          <button className="connect-wallet-btn">Connect</button>

          <nav ref={headerNavRef} className="header-nav">
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

          <IconContext.Provider value={{ size: "2.5rem" }}>
            <div ref={menuIconRef} onClick={() => toggleMenu()} className="menu-content__menu-icon">
              {isOpen ? <FaTimes /> : <FaBars />}
            </div>
          </IconContext.Provider>
        </div>
      </header>
      <CSSTransition timeout={330} in={appState.isMobileMenuOpen} classNames="mobile-menu" unmountOnExit>
        <MobileMenu toggleMenu={toggleMenu} />
      </CSSTransition>
    </>
  )
}

export default Header
