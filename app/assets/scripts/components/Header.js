import React, { useRef, useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { IconContext } from "react-icons"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import MobileMenu from "./MobileMenu"
import { CSSTransition } from "react-transition-group"
import { Web3Button } from "@web3modal/react"
import { useWeb3ModalTheme } from "@web3modal/react"

function Header() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const { theme, setTheme } = useWeb3ModalTheme()
  setTheme({ themeColor: "teal", themeMode: "dark", themeBackground: "gradient" })

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
          <NavLink to="/">
            <img src="./assets/images/happyhourDAO-logo-icon.svg" width="100" height="100" className="logo-icon" alt="Logo-Icon" />
          </NavLink>
          <span className="logo__version-text">v3.</span>
        </div>

        <div className="menu-content">
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

          <Web3Button />

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
