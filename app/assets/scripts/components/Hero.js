import React, { useEffect } from "react"
import { IconContext } from "react-icons"
import Hero_Component_1 from "./Hero_Component_1"
import Hero_2 from "./Hero_2"
import Hero_3 from "./Hero_3"
import Hero_4 from "./Hero_4"
import Hero_5 from "./Hero_5"
import Hero_6 from "./Hero_6"
import Hero_7 from "./Hero_7"
import Hero_8 from "./Hero_8"
import Hero_Component_2 from "./Hero_Component_2"
import Hero_Component_3 from "./Hero_Component_3"
import Hero_Component_5 from "./Hero_Component_5"
import Hero_Component_Last from "./Hero_Component_Last"

function Hero() {
  return (
    <IconContext.Provider value={{ size: "1.2em" }}>
      <Hero_Component_1 />
      <Hero_2 />
      <Hero_3 />
      <Hero_4 />
      <Hero_5 />
      <Hero_6 />
      <Hero_7 />
      <Hero_8 />
      {/* <Hero_Component_2 />
      <Hero_Component_3 />
      <Hero_Component_5 />
      <Hero_Component_Last /> */}
    </IconContext.Provider>
  )
}

export default Hero
