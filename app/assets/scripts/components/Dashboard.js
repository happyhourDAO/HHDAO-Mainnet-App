import React, { useEffect } from "react"
import Footer from "./Footer"

function Dashboard() {
  return (
    <>
      <div className="container">
        <div className="dashboard">
          <div className="dashboard__left-module">
            <section className="interface__top">
              <div className="interface__function-nav">
                <nav>
                  <li>PDE</li>
                  <li>START</li>
                  <li>END</li>
                  <li>$DRNK</li>
                </nav>
              </div>
              <div className="interface__function-description"></div>
            </section>
            <section className="interface__bottom">
              <div className="interface__function-title"></div>
              <div className="interface__function-field"></div>
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
