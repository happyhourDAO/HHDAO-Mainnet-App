import React, { useEffect, useState } from "react"
import { AiOutlineQuestionCircle, AiOutlineMore } from "react-icons/ai"
import { MdCopyAll, MdQrCodeScanner } from "react-icons/md"
import { IconContext } from "react-icons"
import { Tooltip } from "react-tooltip"
import CopyToClipboard from "react-copy-to-clipboard"
import QRcodePopup from "./QRcodePopup"

function PDE_Card({ index, setViewingStruct, setViewingCommission, total, PDEname, PDElocation, PDEaccesscode, PDEid, currentPage, setCurrentPage }) {
  const [copied, setCopied] = useState(false)

  const [openPDEid_QRcode, setOpenPDEid_QRcode] = useState(false)

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
      <IconContext.Provider value={{ size: "0.6em" }}>
        <div className="modal-card__row modal-card__row-1">
          Your PDE Info{" "}
          <span className="connectivity-label--on">
            &#40;{currentPage} of {total}&#41;
          </span>
          <img onClick={handlePrevPage} className="icon icon-back" src="./assets/images/Next-Icon.svg" alt="Back-Icon" />
          {currentPage < total ? <img onClick={handleNextPage} className="icon icon-next-row1" src="./assets/images/Next-Icon.svg" alt="Next-Icon" /> : ""}
        </div>
        <div className="modal-card__row modal-card__row-2">
          <div className="modal-card__row-top">
            Name
            <AiOutlineQuestionCircle className="icon icon-more" id="name-info" />
            <Tooltip anchorId="name-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The name of your PDE should match the name of your IRL drinking establishment. " />
          </div>
          <div className="modal-card__row-bottom">{PDEname}</div>
        </div>
        <div className="modal-card__row modal-card__row-3">
          <div className="modal-card__row-top">
            Location
            <AiOutlineQuestionCircle className="icon icon-more" id="location-info" />
            <Tooltip anchorId="location-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="Location is the actual geographic location of your IRL drinking establishment. This should be accurate in allowing Drinkers to find you." />
          </div>
          <div className="modal-card__row-bottom">{PDElocation}</div>
        </div>
        <div className="modal-card__row modal-card__row-4">
          <div className="modal-card__row-top modal-card__row-top--small-font">
            Access Code
            <AiOutlineQuestionCircle className="icon icon-more" id="accessCode-info" />
            <Tooltip anchorId="accessCode-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The access code is only private to you. It is given to Drinkers upon initiation of a LITT session. The access code can be changed anytime through the setter function, _changeAccessCode, found on the HOURv3.sol contract." />
            <AiOutlineMore onClick={handleSetViewingCommission} className="icon icon-next" />
          </div>
          <div className="modal-card__row-bottom">{PDEaccesscode}</div>
        </div>
        <div className="modal-card__row modal-card__row-5">
          <div className="modal-card__row-top">
            PDE ID
            <AiOutlineQuestionCircle className="icon icon-more" id="pdeID-info" />
            <Tooltip anchorId="pdeID-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The PDE ID is the official identifier of your PDE. It is an unaltered keccak256 hash of your PDE name, PDE location, and PDE address created at the time of the onboarding of your PDE." />
            <CopyToClipboard text={PDEid} onCopy={copiedPopup}>
              <span id="copiedElement">
                <MdCopyAll className="icon icon-copy" />
              </span>
            </CopyToClipboard>
            <div className="qr-code__wrapper">
              <MdQrCodeScanner onClick={() => setOpenPDEid_QRcode(!openPDEid_QRcode)} className={"icon icon-qrCode " + (openPDEid_QRcode ? "icon-qrCode--open" : "")} />
              {openPDEid_QRcode ? <QRcodePopup value={PDEid} /> : ""}
            </div>
            <AiOutlineMore className="icon icon-next" />
          </div>
          <div className="modal-card__row-bottom">{PDEid}</div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default PDE_Card
