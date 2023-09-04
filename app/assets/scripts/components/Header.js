import React, { useRef, useState, useContext } from "react"
import { NavLink } from "react-router-dom"
import { FaBars, FaTimes } from "react-icons/fa"
import { IconContext } from "react-icons"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import MobileMenu from "./MobileMenu"
import { CSSTransition } from "react-transition-group"
import { Web3Button } from "@web3modal/react"

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

  function handlePageSelection(e) {
    switch (e.target.id) {
      case "Dashboard":
        appDispatch({ type: "setOnDashboard" })
        break
      case "Source":
        appDispatch({ type: "setOnSource" })
        break
      case "About":
        appDispatch({ type: "setOnAbout" })
        break
      default:
        appDispatch({ type: "setOnHero" })
    }
  }

  return (
    <>
      <header>
        <div className="logo">
          <img onClick={(e) => appDispatch({ type: "setOnHero" })} src="./assets/images/happyhourDAO-logo-icon.svg" width="100" height="100" className="logo-icon" alt="Logo-Icon" />
          <span className="logo__version-text">v3.</span>
        </div>

        <div className="menu-content">
          <nav ref={headerNavRef} className="header-nav">
            <span id="Hero" onClick={(e) => handlePageSelection(e)} className={"header-nav__links" + (appState.onPage.title == "Hero" ? " header-nav__links--active" : "")}>
              Home
            </span>
            <span id="Dashboard" onClick={(e) => handlePageSelection(e)} className={"header-nav__links" + (appState.onPage.title == "Dashboard" ? " header-nav__links--active" : "")}>
              App
            </span>
            <span id="Source" onClick={(e) => handlePageSelection(e)} className={"header-nav__links" + (appState.onPage.title == "Source" ? " header-nav__links--active" : "")}>
              Source
            </span>
            <span id="About" onClick={(e) => handlePageSelection(e)} className={"header-nav__links" + (appState.onPage.title == "About" ? " header-nav__links--active" : "")}>
              About
            </span>
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
