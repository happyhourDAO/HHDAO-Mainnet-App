import React, { useEffect } from "react"
import Footer from "./Footer"
import { Link } from "react-router-dom"

function Hero_Component_Last() {
  return (
    <>
      <div className="container__hero-component-last">
        <div className="container__hero-component-last__content">
          <span className="container__hero-component-last__content-text">
            Get <div className="gradient-text"> $DRNK </div> with us.
          </span>

          <Link style={{ textDecoration: "none", color: "white", marginLeft: "40px" }} to="/dashboard">
            <span className="gradient-hover container__hero-component-last__content-button">Get #LITT with us.</span>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Hero_Component_Last
