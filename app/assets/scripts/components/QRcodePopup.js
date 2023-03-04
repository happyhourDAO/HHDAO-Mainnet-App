import React, { useEffect, useContext } from "react"
import QRCode from "react-qr-code"
import StateContext from "../StateContext"
import { CopyToClipboard } from "react-copy-to-clipboard"

function QRcodePopup(props) {
  const appState = useContext(StateContext)

  function QRcopiedPopup() {
    document.querySelector(".qr-code__wrapper__container").classList.toggle("qr-copied-popup")

    setTimeout(() => {
      document.querySelector(".qr-code__wrapper__container").classList.toggle("qr-copied-popup")
    }, 1000)
  }

  return (
    <>
      <CopyToClipboard text={props.value} onCopy={QRcopiedPopup}>
        <div className="qr-code__wrapper__container">
          <QRCode bgColor="#d9d9d9" fgColor="#131a2a" style={{ height: "100px", width: "100px" }} value={props.value} />
        </div>
      </CopyToClipboard>
    </>
  )
}

export default QRcodePopup
