import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { IconContext } from "react-icons"

// IMPORTING REACT COMPONENTS
import OnboardPDE from "./OnboardPDE"
import StartLITT from "./StartLITT"
import EndLITT from "./EndLITT"
import MintDRNK from "./MintDRNK"

// IMPORTING OF HOURv3 & DRNKv3 CONTRACT ABI
const HOURabi = require("../contracts/HOURv3.json")

function InterfaceBottom() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  return (
    <>
      <IconContext.Provider value={{ size: "1.2em" }}>
        <OnboardPDE HOURabi={HOURabi} />

        <StartLITT HOURabi={HOURabi} />

        <EndLITT HOURabi={HOURabi} />

        <MintDRNK HOURabi={HOURabi} />
      </IconContext.Provider>
    </>
  )
}

export default InterfaceBottom
