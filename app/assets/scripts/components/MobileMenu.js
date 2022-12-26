import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function MobileMenu(props) {
  const navigate = useNavigate()

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
    navigate("/")
    props.toggleMenu()
  }

  function goApp() {
    navigate("/dashboard")
    props.toggleMenu()
  }

  function goSource() {
    navigate("/source")
    props.toggleMenu()
  }

  function goAbout() {
    navigate("/about")
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
