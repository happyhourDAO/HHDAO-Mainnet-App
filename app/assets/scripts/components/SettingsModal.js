import React, { useEffect } from "react"

function SettingsModal(props) {
  return (
    <>
      <div onClick={props.toggleSettings} className="modal-overlay"></div>

      <div className="modal-card"></div>
    </>
  )
}

export default SettingsModal
