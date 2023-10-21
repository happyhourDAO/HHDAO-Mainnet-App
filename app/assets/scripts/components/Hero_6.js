import React, { useEffect } from "react"

function Hero_6() {
  return (
    <>
      <div style={{ backgroundColor: "#05345E" }} className="container-alt">
        <div className="interior-container">
          <div className="interior-container__image">
            <img src="./assets/images/DJ.png" alt="dj" />
          </div>
          <div className="interior-container__text">
            <div className="interior-container__text__label">The Feedback</div>
            <div className="interior-container__text__title">
              Witness the morph: <br /> F&B ~ <span className="main-color">PDE</span>
            </div>
            <div className="interior-container__text__description">By onboarding your F&B location as a PDE, you now open the doors for patrons and Drinkers to step inside your physical location and earn the $HOUR token. As they earn $HOUR, you also earn a commission rate from their earnings. It’s a two way street in this relationship with yourself and your patrons.</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero_6
