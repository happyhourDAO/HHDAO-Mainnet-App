import React, { useEffect, useState } from "react"
import { AiOutlineQuestionCircle, AiOutlineMore } from "react-icons/ai"
import { IconContext } from "react-icons"

function HOUR_Commission_Card({ commission, setViewingCommission }) {
  const [eventIndex, setEventIndex] = useState(0)

  function handleNextEventIndex() {
    setEventIndex(prev => prev + 1)
  }

  function handlePrevEventIndex() {
    if (eventIndex == 0) {
      setViewingCommission(false)
    } else {
      setEventIndex(prev => prev - 1)
    }
  }

  return (
    <>
      <IconContext.Provider value={{ size: "0.6em" }}>
        <div className="modal-card__row modal-card__row-1">
          Commission Info
          <br />
          Total Earned: {commission.b}
          <br />
          <span className="connectivity-label--off">&#40;Event&#41;</span>
          <img onClick={handlePrevEventIndex} className="icon icon-back" src="./assets/images/Next-Icon.svg" alt="Back-Icon" />
          {eventIndex + 1 < commission.a.length ? <img onClick={handleNextEventIndex} className="icon icon-next-row1" src="./assets/images/Next-Icon.svg" alt="Next-Icon" /> : ""}
        </div>
        <div className="modal-card__row modal-card__row-2">
          <div className="modal-card__row-top">
            Time
            <AiOutlineQuestionCircle className="icon icon-more" />
          </div>
          <div className="modal-card__row-bottom">Block #: {commission.b == 0 ? "n/a" : commission.a[eventIndex].blockNumber}</div>
        </div>
        <div className="modal-card__row modal-card__row-3">
          <div className="modal-card__row-top">
            Earned
            <AiOutlineQuestionCircle className="icon icon-more" />
          </div>
          <div className="modal-card__row-bottom">Commission: {commission.b == 0 ? "n/a" : commission.a[eventIndex].commission}</div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default HOUR_Commission_Card
