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
            <section className="stats-board__description"></section>
            <section className="stats-board__index"></section>
            <section className="stats-board__contracts"></section>
            <section className="stats-board__rates"></section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard
