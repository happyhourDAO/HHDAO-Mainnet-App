import React, { useEffect } from "react"

function Hero_2() {
  return (
    <>
      <div style={{ backgroundColor: "#05052C" }} className="container-alt">
        <div className="interior-container">
          <div className="interior-container__image">
            <img src="./assets/images/Ravaged-Bar.png" alt="ravaged-bar" />
          </div>
          <div className="interior-container__text">
            <div className="interior-container__text__label">The Problem</div>
            <div className="interior-container__text__title">
              The pandemic <span className="main-color">ravaged</span>
              <br />
              the nightlife culture
            </div>
            <div className="interior-container__text__description">But as we saw the global economy opening back up with pandemic restrictions becoming obsolete, it’s still unclear on whether people go out the same as they used to. Favorite bars and nightlife venues are no longer around. It’s safe to say the F&B industry is still struggling.</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero_2
