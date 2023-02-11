import React, { useEffect } from "react"
import { AiOutlineQuestionCircle, AiOutlineMore } from "react-icons/ai"
import { IconContext } from "react-icons"

function PDE_Card({ key, index, setViewingStruct, setViewingCommission, total, PDEname, PDElocation, PDEaccesscode, PDEid, currentPage, setCurrentPage }) {
  function handleNextPage() {
    setCurrentPage(prev => prev + 1)
  }

  function handlePrevPage() {
    if (currentPage == 1) {
      setViewingStruct(false)
    } else {
      setCurrentPage(prev => prev - 1)
    }
  }

  function handleSetViewingCommission() {
    setViewingCommission(true)
  }

  return (
    <>
      <IconContext.Provider value={{ size: "0.6em" }}>
        <div className="modal-card__row modal-card__row-1">
          PDE Info{" "}
          <span className="connectivity-label--off">
            &#40;{currentPage} of {total}&#41;
          </span>
          <img onClick={handlePrevPage} className="icon icon-back" src="./assets/images/Next-Icon.svg" alt="Back-Icon" />
          {currentPage < total ? <img onClick={handleNextPage} className="icon icon-next-row1" src="./assets/images/Next-Icon.svg" alt="Next-Icon" /> : ""}
        </div>
        <div className="modal-card__row modal-card__row-2">
          <div className="modal-card__row-top">
            Name
            <AiOutlineQuestionCircle className="icon icon-more" />
          </div>
          <div className="modal-card__row-bottom">{PDEname}</div>
        </div>
        <div className="modal-card__row modal-card__row-3">
          <div className="modal-card__row-top">
            Location
            <AiOutlineQuestionCircle className="icon icon-more" />
          </div>
          <div className="modal-card__row-bottom">{PDElocation}</div>
        </div>
        <div className="modal-card__row modal-card__row-4">
          <div className="modal-card__row-top modal-card__row-top--small-font">
            Access Code
            <AiOutlineQuestionCircle className="icon icon-more" />
            <AiOutlineMore onClick={handleSetViewingCommission} className="icon icon-next" />
          </div>
          <div className="modal-card__row-bottom">{PDEaccesscode}</div>
        </div>
        <div className="modal-card__row modal-card__row-5">
          <div className="modal-card__row-top">
            PDE ID
            <AiOutlineQuestionCircle className="icon icon-more" />
            <AiOutlineMore className="icon icon-next" />
          </div>
          <div className="modal-card__row-bottom">{PDEid}</div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default PDE_Card
