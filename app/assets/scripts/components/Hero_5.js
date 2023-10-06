import React, { useEffect } from "react"

function Hero_5() {
  return (
    <>
      <div style={{ backgroundColor: "#05052C" }} className="container-alt">
        <div className="interior-container">
          <div className="interior-container__text interior-container__text--flex-start">
            <div className="interior-container__text__label">The Tokenomics</div>
            <div className="interior-container__text__title interior-container__text__title--text-align-left">
              Web3’s first <br /> <span className="main-color">Drink</span>-To-Earn
            </div>
            <div className="interior-container__text__description">We envision the novel Drink-To-Earn model as an infinite positive feedback loop. As drinkers earn $HOUR by the hour, drinking establishments can earn a commission of the $HOUR earned by drinkers. Freshly earned $HOUR tokens can then be used at other participating drinking establishments in purchasing deeply discounted cocktails or to be burned to earn the happyhourDAO’s governance token, $DRNK.</div>
          </div>
          <div className="interior-container__image">
            <img src="./assets/images/glass.png" alt="glass" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero_5
