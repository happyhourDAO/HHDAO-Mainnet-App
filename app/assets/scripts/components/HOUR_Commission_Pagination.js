import React, { useContext } from "react"
import HOUR_Commission_Card from "./HOUR_Commission_Card"
import StateContext from "../StateContext"

function HOUR_Commission_Pagination({ index, setViewingCommission }) {
  const appState = useContext(StateContext)

  return (
    <>
      <HOUR_Commission_Card index={index} commissionArray={appState.PDEownership.commissionArray} setViewingCommission={setViewingCommission} />
    </>
  )
}

export default HOUR_Commission_Pagination
