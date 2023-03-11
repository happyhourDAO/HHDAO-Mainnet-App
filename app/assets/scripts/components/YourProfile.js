import React, { useContext, useState } from "react"
import { AiOutlineQuestionCircle, AiOutlinePlus, AiOutlineMore } from "react-icons/ai"
import { IconContext } from "react-icons"
import { MdCopyAll, MdQrCodeScanner } from "react-icons/md"
import { Tooltip } from "react-tooltip"
import StateContext from "../StateContext"
import { CopyToClipboard } from "react-copy-to-clipboard"
import QRcodePopup from "./QRcodePopup"
import ViewDrinkingLocation_Card from "./ViewDrinkingLocation_Card"

function YourProfile(props) {
  const appState = useContext(StateContext)

  // Viewing Drinking Location if currentDrinkingID == true
  const [viewDrinkingLocation, setViewDrinkingLocation] = useState(false)

  // QR Code Popup
  const [openHOURcontract_QRcode, setOpenHOURcontract_QRcode] = useState(false)
  const [openDRNKcontract_QRcode, setOpenDRNKcontract_QRcode] = useState(false)

  function copiedPopup() {
    document.querySelector(".icon-copy").classList.toggle("icon")
    document.querySelector(".icon-copy").classList.toggle("icon-copy--active")
    document.querySelector("#copiedElement").classList.toggle("copied-popup")

    setTimeout(() => {
      document.querySelector(".icon-copy").classList.toggle("icon")
      document.querySelector(".icon-copy").classList.toggle("icon-copy--active")
      document.querySelector("#copiedElement").classList.toggle("copied-popup")
    }, 1000)
  }

  return (
    <>
      {viewDrinkingLocation ? (
        <ViewDrinkingLocation_Card provider={props.provider} setViewDrinkingLocation={setViewDrinkingLocation} />
      ) : (
        <IconContext.Provider value={{ size: "0.6em" }}>
          <div className="modal-card__row modal-card__row-1">
            Your Profile <span className={appState.account.address ? "connectivity-label--on" : "connectivity-label--off"}>&#40;{appState.account.address ? "connected" : "disconnected"}&#41;</span>
          </div>
          <div className="modal-card__row modal-card__row-2">
            <div className="modal-card__row-top">
              $HOUR
              <AiOutlineQuestionCircle className="icon icon-more" id="HOUR-info" />
              <Tooltip anchorId="HOUR-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The $HOUR token is the earned utility token from the completion of a session initialization with a PDE." />
              <div className="qr-code__wrapper">
                <MdQrCodeScanner onClick={() => setOpenHOURcontract_QRcode(!openHOURcontract_QRcode)} className={"icon icon-qrCode " + (openHOURcontract_QRcode ? "icon-qrCode--open" : "")} />
                {openHOURcontract_QRcode ? <QRcodePopup value={appState.HOURnetwork.contractObject.address} /> : ""}
              </div>
              <AiOutlinePlus className="icon icon-add" />
            </div>
            <div className="modal-card__row-bottom">Balance: {appState.account.amountHOUR ? appState.account.amountHOUR : 0}</div>
          </div>
          <div className="modal-card__row modal-card__row-3">
            <div className="modal-card__row-top">
              $DRNK
              <AiOutlineQuestionCircle className="icon icon-more" id="DRNK-info" />
              <Tooltip anchorId="DRNK-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The $DRNK token is the official governance token of the happyhourDAO. Burn $HOUR to mint $DRNK." />
              <div className="qr-code__wrapper">
                <MdQrCodeScanner onClick={() => setOpenDRNKcontract_QRcode(!openDRNKcontract_QRcode)} className={"icon icon-qrCode " + (openDRNKcontract_QRcode ? "icon-qrCode--open" : "")} />
                {openDRNKcontract_QRcode ? <QRcodePopup value={appState.DRNKnetwork.contractAddress} /> : ""}
              </div>
              <AiOutlinePlus className="icon icon-add" />
            </div>
            <div className="modal-card__row-bottom">Balance: {appState.account.amountDRNK ? appState.account.amountDRNK : 0}</div>
          </div>
          <div className="modal-card__row modal-card__row-4">
            <div className="modal-card__row-top modal-card__row-top--small-font">
              PDEs Owned
              <AiOutlineQuestionCircle className="icon icon-more" id="PDE-info" />
              <Tooltip anchorId="PDE-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The units of PDEs owned are the amount of Partcipating Drinking Establishments you control on the network. Navigate towards the 3 vertical dots to see more info." />
              {appState.account.isPDEowner ? <AiOutlineMore onClick={() => props.setViewingStruct(true)} className="icon icon-next" /> : ""}
            </div>
            <div className="modal-card__row-bottom">Units: {appState.PDEownership.indexArray.length}</div>
          </div>
          <div className="modal-card__row modal-card__row-5">
            <div className="modal-card__row-top">
              Drinking ID
              <AiOutlineQuestionCircle className="icon icon-more" id="DrinkingID-info" />
              <Tooltip anchorId="DrinkingID-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="If you are currently getting LITT, you are assigned a Drinking ID that is tied to a PDE ID." />
              <CopyToClipboard text={appState.account.currentDrinkingID} onCopy={copiedPopup}>
                <span id="copiedElement">
                  <MdCopyAll className="icon icon-copy" />
                </span>
              </CopyToClipboard>
              {appState.account.currentDrinkingID.length > 1 ? <AiOutlineMore onClick={() => setViewDrinkingLocation(true)} className="icon icon-next" /> : ""}
            </div>
            <div className="modal-card__row-bottom">ID: {appState.account.currentDrinkingID == 0 ? "n/a" : parseInt(appState.account.currentDrinkingID.slice(-7))}</div>
          </div>
        </IconContext.Provider>
      )}
    </>
  )
}

export default YourProfile
