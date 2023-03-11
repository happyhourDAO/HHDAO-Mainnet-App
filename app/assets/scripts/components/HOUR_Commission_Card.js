import React, { useState } from "react"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { IconContext } from "react-icons"
import { Tooltip } from "react-tooltip"

function HOUR_Commission_Card({ index, commissionArray, setViewingCommission }) {
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
          PDE Commission Info
          <br />
          <span style={{ fontSize: "0.9em", color: "whitesmoke" }}>Total Earned: {commissionArray[index].b}</span>
          <br />
          <span className="connectivity-label--on">
            Earned Event &#40;{commissionArray[index].b == 0 ? "0" : eventIndex + 1} of {commissionArray[index].a.length}&#41;
          </span>
          <img onClick={handlePrevEventIndex} className="icon icon-back" src="./assets/images/Next-Icon.svg" alt="Back-Icon" />
          {eventIndex + 1 < commissionArray[index].a.length ? <img onClick={handleNextEventIndex} className="icon icon-next-row1" src="./assets/images/Next-Icon.svg" alt="Next-Icon" /> : ""}
        </div>
        <div className="modal-card__row modal-card__row-2">
          <div className="modal-card__row-top">
            Time
            <AiOutlineQuestionCircle className="icon icon-more" id="time-info" />
            <Tooltip anchorId="time-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The time of this commission earned event is captured in Ethereum block number." />
          </div>
          <div className="modal-card__row-bottom">Block #: {commissionArray[index].b == 0 ? "n/a" : commissionArray[index].a[eventIndex].blockNumber}</div>
        </div>
        <div className="modal-card__row modal-card__row-3">
          <div className="modal-card__row-top">
            Earned
            <AiOutlineQuestionCircle className="icon icon-more" id="earned-info" />
            <Tooltip anchorId="earned-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The amount in commission earned below is designated in $HOUR." />
          </div>
          <div className="modal-card__row-bottom">Commission: {commissionArray[index].b == 0 ? "n/a" : commissionArray[index].a[eventIndex].HOURcommissionEarned}</div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default HOUR_Commission_Card
