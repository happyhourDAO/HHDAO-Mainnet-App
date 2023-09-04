import React, { useContext } from "react"
import StateContext from "../StateContext"
import { IconContext } from "react-icons"

// IMPORTING REACT COMPONENTS
import OnboardPDE from "./OnboardPDE"
import StartLITT from "./StartLITT"
import EndLITT from "./EndLITT"
import MintDRNK from "./MintDRNK"

function InterfaceBottom() {
  const appState = useContext(StateContext)

  return (
    <>
      <IconContext.Provider value={{ size: "1.2em" }}>
        <OnboardPDE HOURabi={appState.HOURnetwork.contractObject ? appState.HOURnetwork.contractObject.abi : appState.HOURnetwork.abi} />

        <StartLITT HOURabi={appState.HOURnetwork.contractObject ? appState.HOURnetwork.contractObject.abi : appState.HOURnetwork.abi} />

        <EndLITT HOURabi={appState.HOURnetwork.contractObject ? appState.HOURnetwork.contractObject.abi : appState.HOURnetwork.abi} />

        <MintDRNK HOURabi={appState.HOURnetwork.contractObject ? appState.HOURnetwork.contractObject.abi : appState.HOURnetwork.abi} />
      </IconContext.Provider>
    </>
  )
}

export default InterfaceBottom
