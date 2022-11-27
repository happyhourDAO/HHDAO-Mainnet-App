import React, { useEffect } from "react"
import { Link } from "react-router-dom"

function Hero() {
  return (
    <div class="hero">
      <h1 class="hero_title">Welcome to happyhourDAO</h1>
      <p>Every web2 bar needs a web3 bar.</p>
      <Link to="/dashboard">Go To Dashboard</Link>
    </div>
  )
}

export default Hero
