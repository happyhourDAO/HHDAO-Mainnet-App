import React, { useEffect } from "react"
// import Flip from "react-reveal/Flip"

function Hero_Component_2() {
  return (
    <>
      <div className="container__hero-component-2">
        {/* <Flip bottom> */}
        <div className="container__hero-component-2__line">
          A community owned{" "}
          <span className="gradient-hover-2">
            <a style={{ textDecoration: "none", color: "white" }} href="https://mirror.xyz/0x2b776aa3C2389D6a3B7b11cd99Fdb94190bAF75b/ASFFVFiQAWaSzUuwDDeOhwAyHUE7y_2ei3VmUi9aCzA" target="_blank">
              Drink-To-Earn
            </a>
          </span>
        </div>
        <div className="container__hero-component-2__line">decentralized network for web3,</div>
        <div className="container__hero-component-2__line">
          <span className="container__hero-component-2--white-bg">empowering</span> the <span className="container__hero-component-2--white-bg">F&B industry</span> in
        </div>
        <div className="container__hero-component-2__line">engaging with the metaverse.</div>
        {/* </Flip> */}
      </div>
    </>
  )
}

export default Hero_Component_2
