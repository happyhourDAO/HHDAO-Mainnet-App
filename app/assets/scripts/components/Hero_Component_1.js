import React, { useContext } from "react"
import DispatchContext from "../DispatchContext"
import { SiTwitter, SiDiscord, SiGithub, SiGitbook } from "react-icons/si"
import { useNavigate } from "react-router-dom"

function Hero_Component_1() {
  const appDispatch = useContext(DispatchContext)

  let navigate = useNavigate()

  function handleClick() {
    appDispatch({ type: "setOnDashboard" })
  }

  return (
    <>
      <div className="container">
        <div className="hero">
          <div className="hero-component-1">
            <div className="hero-component-1__left-block">
              <div className="hero__title">happyhourDAO</div>
              <div className="hero__subtitle">
                Because every web2 bar <br /> needs a web3 bar.
              </div>
              <div className="hero__subtitle-brief">
                <div className="hero__subtitle-brief__left-block">
                  📍 Find A PDE <br /> 🔥 Gett #LITT
                </div>
                <div className="hero__subtitle-brief__right-block">
                  <a href="https://twitter.com/happyhourDAO" target="_blank">
                    <SiTwitter className="social-media-icons__link" />
                  </a>
                  <a href="https://github.com/happyhourDAO" target="_blank">
                    <SiGithub className="social-media-icons__link" />
                  </a>
                  <a href="https://discord.gg/XegjVTGmyR" target="_blank">
                    <SiDiscord className="social-media-icons__link" />
                  </a>
                  <a href="https://happy-hour-1.gitbook.io/happyhourdao/" target="_blank">
                    <SiGitbook className="social-media-icons__link" />
                  </a>
                  <a href="https://mirror.xyz/0x2b776aa3C2389D6a3B7b11cd99Fdb94190bAF75b" target="_blank">
                    <div className="social-media-icons__mirror"></div>
                  </a>
                </div>
              </div>
              <button onClick={handleClick}>Go To Dashboard</button>
              <a style={{ color: "lightgray", marginTop: "10px" }} href="https://drive.google.com/file/d/1u68BTH5Hx1sXBIglYcRtpedAYcFtnXgX/view?usp=sharing" target="_blank">
                View Whitepaper
              </a>
            </div>
            <div className="hero-component-1__right-block">
              <img src="./assets/images/Logo-Icon-Animated.gif" alt="Animated Icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero_Component_1
