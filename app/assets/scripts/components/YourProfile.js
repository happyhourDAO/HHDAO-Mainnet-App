import React, { useEffect } from "react"
import { AiOutlineQuestionCircle, AiOutlinePlus, AiOutlineMore } from "react-icons/ai"
import { IconContext } from "react-icons"

function YourProfile(props) {
  return (
    <>
      <IconContext.Provider value={{ size: "0.6em" }}>
        <div className="modal-card__row modal-card__row-1">
          Your Profile <span className="connectivity-label--off">&#40;disconnected&#41;</span>
        </div>
        <div className="modal-card__row modal-card__row-2">
          <div className="modal-card__row-top">
            $HOUR
            <AiOutlineQuestionCircle className="icon icon-more" />
            <AiOutlinePlus className="icon icon-add" />
          </div>
          <div className="modal-card__row-bottom">Balance:</div>
        </div>
        <div className="modal-card__row modal-card__row-3">
          <div className="modal-card__row-top">
            $DRNK
            <AiOutlineQuestionCircle className="icon icon-more" />
            <AiOutlinePlus className="icon icon-add" />
          </div>
          <div className="modal-card__row-bottom">Balance:</div>
        </div>
        <div className="modal-card__row modal-card__row-4">
          <div className="modal-card__row-top modal-card__row-top--small-font">
            PDEs Owned
            <AiOutlineQuestionCircle className="icon icon-more" />
            {props.isPDEowner ? <AiOutlineMore onClick={() => props.setViewingStruct(true)} className="icon icon-next" /> : ""}
          </div>
          <div className="modal-card__row-bottom">Units:</div>
        </div>
        <div className="modal-card__row modal-card__row-5">
          <div className="modal-card__row-top">
            Drinking ID
            <AiOutlineQuestionCircle className="icon icon-more" />
            <AiOutlineMore className="icon icon-next" />
          </div>
          <div className="modal-card__row-bottom">ID:</div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default YourProfile
