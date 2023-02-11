import React, { useEffect, useState } from "react"
import YourProfile from "./YourProfile"
import PDE_Pagination from "./PDE_Pagination"
import HOUR_Commission_Pagination from "./HOUR_Commission_Pagination"

function SettingsModal(props) {
  const isPDEowner = true
  const [viewingStruct, setViewingStruct] = useState(false)
  const [viewingCommission, setViewingCommission] = useState(false)

  return (
    <>
      <div className="modal-card">{viewingStruct ? <PDE_Pagination viewingCommission={viewingCommission} setViewingCommission={setViewingCommission} setViewingStruct={setViewingStruct} /> : <YourProfile isPDEowner={isPDEowner} setViewingStruct={setViewingStruct} />}</div>
    </>
  )
}

export default SettingsModal
