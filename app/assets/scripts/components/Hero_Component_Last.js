import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"
import Footer from "./Footer"
import { Link } from "react-router-dom"

function Hero_Component_Last() {
  const appDispatch = useContext(DispatchContext)

  return (
    <>
      <div className="container__hero-component-last">
        <div className="container__hero-component-last__content">
          <span className="container__hero-component-last__content-text">
            Get <div className="gradient-text"> $DRNK </div> with us.
          </span>

          <span onClick={(e) => appDispatch({ type: "setOnDashboard" })} style={{ textDecoration: "none", color: "white", marginLeft: "40px" }}>
            <span className="gradient-hover container__hero-component-last__content-button">Get #LITT with us.</span>
          </span>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Hero_Component_Last
