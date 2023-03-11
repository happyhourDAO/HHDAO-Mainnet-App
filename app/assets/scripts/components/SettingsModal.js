import React, { useState } from "react"
import YourProfile from "./YourProfile"
import PDE_Pagination from "./PDE_Pagination"

function SettingsModal(props) {
  const [viewingStruct, setViewingStruct] = useState(false)
  const [viewingCommission, setViewingCommission] = useState(false)

  return (
    <>
      <div className="modal-card">{viewingStruct ? <PDE_Pagination viewingCommission={viewingCommission} setViewingCommission={setViewingCommission} setViewingStruct={setViewingStruct} /> : <YourProfile setViewingStruct={setViewingStruct} provider={props.provider} />}</div>
    </>
  )
}

export default SettingsModal
