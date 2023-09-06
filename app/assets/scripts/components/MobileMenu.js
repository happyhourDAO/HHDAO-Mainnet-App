import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"

function MobileMenu(props) {
  const appDispatch = useContext(DispatchContext)

  useEffect(() => {
    document.addEventListener("keyup", KeyPressHandler)
    return () => document.removeEventListener("keyup", KeyPressHandler)
  }, [])

  function KeyPressHandler(e) {
    if (e.keyCode == 27) {
      props.toggleMenu()
    }
  }

  function goHome() {
    appDispatch({ type: "setOnHero" })
    props.toggleMenu()
  }

  function goApp() {
    appDispatch({ type: "setOnDashboard" })
    props.toggleMenu()
  }

  function goSource() {
    appDispatch({ type: "setOnSource" })
    props.toggleMenu()
  }

  function goAbout() {
    appDispatch({ type: "setOnAbout" })
    props.toggleMenu()
  }

  return (
    <div className="mobile-menu">
      <div className="mobile-menu__container">
        <span className="mobile-menu__link" onClick={goHome}>
          Home
        </span>
        <span className="mobile-menu__link" onClick={goApp}>
          App
        </span>
        <span className="mobile-menu__link" onClick={goSource}>
          Source
        </span>
        <span className="mobile-menu__link" onClick={goAbout}>
          About
        </span>
      </div>
    </div>
  )
}

export default MobileMenu
