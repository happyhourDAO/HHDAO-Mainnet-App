import React, { useEffect } from "react"

function SettingsModal(props) {
  return (
    <>
      <div className="modal-card">
        <div className="modal-card__row modal-card__row-1">Your Profile</div>
        <div className="modal-card__row modal-card__row-2">
          <div className="modal-card__row-top">$HOUR</div>
          <div className="modal-card__row-bottom">Balance:</div>
        </div>
        <div className="modal-card__row modal-card__row-3">
          <div className="modal-card__row-top">$DRNK</div>
          <div className="modal-card__row-bottom">Balance:</div>
        </div>
        <div className="modal-card__row modal-card__row-4">
          <div className="modal-card__row-top">PDEs Owned</div>
          <div className="modal-card__row-bottom">Units:</div>
        </div>
        <div className="modal-card__row modal-card__row-5">
          <div className="modal-card__row-top modal-card__row-top--smaller-font">Current Drinking ID</div>
          <div className="modal-card__row-bottom">ID:</div>
        </div>
      </div>
    </>
  )
}

export default SettingsModal
