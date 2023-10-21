import React, { useEffect } from "react"

function Hero_7() {
  return (
    <>
      <div style={{ backgroundColor: "#0F051C" }} className="container-alt">
        <div className="interior-container">
          <div className="interior-container__text interior-container__text--flex-start">
            <div className="interior-container__text__label">The Goal</div>
            <div className="interior-container__text__title interior-container__text__title--text-align-left">
              Gettin’ $<span className="main-color">DRNK</span> <br /> in the metaverse
            </div>
            <div className="interior-container__text__description">The $DRNK governance token is the official membership token of the happyhourDAO VC venture. An open, organic DAO community for web3 natives interested in raising strategic investments/funding for their local F&B merchants. Giving millennials and web3 natives more of a say in what they want to see in the F&B scene.</div>
          </div>
          <div className="interior-container__image">
            <img src="./assets/images/Metaverse.png" alt="metaverse" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero_7
