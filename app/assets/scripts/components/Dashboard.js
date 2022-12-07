import React, { useEffect, useContext } from "react"
import Footer from "./Footer"
import InterfaceTop from "./InterfaceTop"
import InterfaceBottom from "./InterfaceBottom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function Dashboard() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  return (
    <>
      <div className="container">
        <div className="dashboard">
          <div className="dashboard__left-module">
            <section className="interface interface__top">
              <InterfaceTop />
            </section>
            <section className="interface interface__bottom">
              <InterfaceBottom />
            </section>
          </div>
          <div className="dashboard__right-module">
            <section className="stats-board__description">
              <h3 className="stats-board--no-margin stats-board--label-font">About</h3>
              <p className="stats-board--gray-color">The happyhourDAO will be powered by the Happy Hour Protocol Engine, which is the heart and soul of the whole ecosystem. This is what will glue together the drinkers, Participating Drinking Establishments &#40;PDEs&#41;, devs, investors, and other stakeholders.</p>
            </section>
            <section className="stats-board__index">
              <p className="">
                <span className="stats-board__index--larger stats-board__index--dark-purple">69</span>
                <span className="stats-board--gray-color">PDEs</span>
              </p>
              <p className="">
                <span className="stats-board__index--larger stats-board__index--dark-purple">420</span>
                <span className="stats-board--gray-color">Drinkers</span>
              </p>
            </section>
            <section className="stats-board__contracts">
              <h3 className="stats-board--label-font">Deployed Contracts</h3>
              <p className="stats-board--gray-color stats-board--no-margin">HappyHourProtocolv3:</p>
              <a href="" className="stats-board__contracts--link-styling">
                0x55f8558d9b7dfffa286015b8376db1a50a0c4ff9
              </a>
              <p className="stats-board--gray-color stats-board--no-margin-bottom">DRNKgovernance:</p>
              <a href="" className="stats-board__contracts--link-styling">
                0x89f1a702eecfb47cf9289b3481349e1f38367c44
              </a>
            </section>
            <section className="stats-board__rates">
              <h3 className="stats-board--label-font">Live Rates</h3>
              <p className="stats-board--gray-color stats-board--no-margin">$HOUR / hour = 100</p>
              <p className="stats-board--gray-color stats-board--no-margin">Happy Hour Fee = 0.01 ETH</p>
              <p className="stats-board--gray-color stats-board--no-margin">HOUR burn minimum = 2000 $HOUR</p>
              <p className="stats-board--gray-color stats-board--no-margin">PDE commission = 10%</p>
              <p className="stats-board--gray-color stats-board--no-margin">$HOUR / $DRNK = 1 / 10</p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard
