import React, { useEffect } from "react"
import { IconContext } from "react-icons"
import Hero_Component_1 from "./Hero_Component_1"
import Hero_Component_2 from "./Hero_Component_2"

function Hero() {
  return (
    <IconContext.Provider value={{ size: "1.2em" }}>
      <Hero_Component_1 />
      <Hero_Component_2 />
    </IconContext.Provider>
  )
}

export default Hero
