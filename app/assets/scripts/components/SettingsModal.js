import React, { useEffect, useState, useContext } from "react"
import YourProfile from "./YourProfile"
import PDE_Pagination from "./PDE_Pagination"
import HOUR_Commission_Pagination from "./HOUR_Commission_Pagination"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function SettingsModal(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [viewingStruct, setViewingStruct] = useState(false)
  const [viewingCommission, setViewingCommission] = useState(false)

  return (
    <>
      <div className="modal-card">{viewingStruct ? <PDE_Pagination viewingCommission={viewingCommission} setViewingCommission={setViewingCommission} setViewingStruct={setViewingStruct} /> : <YourProfile setViewingStruct={setViewingStruct} provider={props.provider} />}</div>
    </>
  )
}

export default SettingsModal
