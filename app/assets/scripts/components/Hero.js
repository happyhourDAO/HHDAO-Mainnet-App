import React, { useEffect } from "react"
import { IconContext } from "react-icons"
import Hero_Component_1 from "./Hero_Component_1"
import Hero_Component_2 from "./Hero_Component_2"
import Hero_Component_3 from "./Hero_Component_3"
import Hero_Component_5 from "./Hero_Component_5"
import Hero_Component_Last from "./Hero_Component_Last"

function Hero() {
  return (
    <IconContext.Provider value={{ size: "1.2em" }}>
      <Hero_Component_1 />
      {/* <Hero_Component_2 />
      <Hero_Component_3 />
      <Hero_Component_5 />
      <Hero_Component_Last /> */}
    </IconContext.Provider>
  )
}

export default Hero
