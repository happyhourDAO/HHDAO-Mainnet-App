import React, { useEffect, useContext, useState } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { useDebounce } from "use-debounce"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { MdCopyAll, MdReadMore, MdShare, MdQrCodeScanner } from "react-icons/md"
import QRreaderPopup from "./QRreaderPopup"

// IMPORTING WAGMI REACT HOOKS
import { usePrepareContractWrite } from "wagmi"
import { useContractWrite } from "wagmi"
import { ethers } from "ethers"

function StartLITT({ HOURabi }) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [openQRreader, setOpenQRreader] = useState(false)
  const [scannedValue, setScannedValue] = useState()

  const [PDEid, setPDEid] = useState("")
  const [accessCode, setAccessCode] = useState("")
  const [PDEid_debounced] = useDebounce(PDEid, 2000)
  const [accessCode_debounced] = useDebounce(accessCode, 2000)

  const iface = new ethers.utils.Interface(HOURabi)

  const { config, error } = usePrepareContractWrite({
    address: "0x3807DAB03E8519F0F4f4c37568E27a71B138d47b",
    abi: HOURabi,
    functionName: "startHOUR",
    args: [PDEid_debounced, accessCode_debounced],
    overrides: {
      value: ethers.utils.parseEther("0.01")
    },
    enabled: Boolean(PDEid_debounced && accessCode_debounced),
    onSettled(data, error) {
      null
    }
  })

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)

  async function getEventResults(txReceipt) {
    const { data, topics } = await txReceipt.logs[0]

    if (data && topics) {
      const eventResults = iface.parseLog({ data, topics })
      console.log(eventResults)
      appDispatch({ type: "setDrinkingID", value: eventResults.args[1].toString() })
    }
  }

  useEffect(() => {
    console.log("error from prepare", error)
  }, [error])

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
      <div className={"interface__function-title " + (appState.functionIndex == 2 ? "" : "non-visible")}>
        <p>Start LITT.</p>
      </div>

      {isLoading ? (
        <form className={"interface__function-field " + (appState.functionIndex == 2 ? "" : "non-visible")}>
          <div className="dots-loading">
            <div></div>
          </div>
        </form>
      ) : isSuccess || appState.account.currentDrinkingID.length > 1 ? (
        <form
          onSubmit={e => {
            e.preventDefault()
          }}
          className={"interface__function-field interface__function-field--overflow " + (appState.functionIndex == 2 ? "" : "non-visible")}
        >
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Event Result
              <div className="icon-twitter">
                <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=I%20just%20started%20getting%20LITT!&via=happyhourDAO">
                  <MdShare className="icon icon-share" />
                </a>
              </div>
            </div>
            <div className="interface__function-field__results-row-bottom">You are getting LITT!</div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Designated Drinking ID
              <CopyToClipboard text={appState.account.currentDrinkingID} onCopy={copiedPopup}>
                <span id="copiedElement">
                  <MdCopyAll className="icon icon-copy" />
                </span>
              </CopyToClipboard>
              <a href="https://mirror.xyz/0x2b776aa3C2389D6a3B7b11cd99Fdb94190bAF75b/Xd9MdUjalXfpZmKzPPWAQ60V3-RvziU7L62gfNRGNOo" target="_blank">
                <MdReadMore className="icon icon-read" />
              </a>
            </div>
            <div className="interface__function-field__results-row-bottom interface__function-field__results-row-bottom--ellipsis">{appState.account.currentDrinkingID > 1 ? appState.account.currentDrinkingID : "Serving your Drinking ID..."}</div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Notes
              <a href="https://mirror.xyz/0x2b776aa3C2389D6a3B7b11cd99Fdb94190bAF75b/Xd9MdUjalXfpZmKzPPWAQ60V3-RvziU7L62gfNRGNOo" target="_blank">
                <MdReadMore className="icon icon-read" />
              </a>
            </div>
            <div className="interface__function-field__results-row-bottom">LITT Sessions are only valid for 8 hours. You'll need to end your LITT session before 8 hours. Drink responsibly.</div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()
            writeAsync?.()
              .then(txResponse => txResponse.wait().then(txReceipt => getEventResults(txReceipt)))
              .catch(console.error)
          }}
          className={"interface__function-field " + (appState.functionIndex == 2 ? "" : "non-visible")}
        >
          <div className="input-box">
            <input type="text" value={scannedValue ? scannedValue : undefined} onChange={e => setPDEid(e.target.value)} required />
            <span>ID of PDE</span>
            <div className="qr-code__wrapper">
              <MdQrCodeScanner onClick={() => null} className={"icon icon-qrCode icon-qrCode-reader " + (openQRreader ? "icon-qrCode--open" : "")} />
              {openQRreader ? <QRreaderPopup setPDEid={setPDEid} setScannedValue={setScannedValue} openQRreader={openQRreader} setOpenQRreader={setOpenQRreader} /> : ""}
            </div>
          </div>
          <div className="input-box">
            <input type="text" onChange={e => setAccessCode(e.target.value)} required />
            <span>access code</span>
          </div>
          <div className="input-box">
            <button disabled={!writeAsync} className={writeAsync ? "" : "button--disabled"} onClick={() => console.log(writeAsync)}>
              button
            </button>
            {error ? <div className="usePrepare-error">Invalid PDE ID & access code combination</div> : ""}
          </div>
        </form>
      )}
    </>
  )
}

export default StartLITT
