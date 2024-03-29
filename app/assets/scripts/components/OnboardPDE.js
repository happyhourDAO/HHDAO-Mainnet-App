import React, { useEffect, useContext, useState } from "react"
import StateContext from "../StateContext"
import { useDebounce } from "use-debounce"
import { CopyToClipboard } from "react-copy-to-clipboard"
import { MdCopyAll, MdReadMore, MdShare } from "react-icons/md"

// IMPORTING WAGMI REACT HOOKS
import { usePrepareContractWrite } from "wagmi"
import { useContractWrite } from "wagmi"
import { waitForTransaction } from "wagmi/actions"
import { utils } from "ethers"

function OnboardPDE({ HOURabi }) {
  const appState = useContext(StateContext)

  const [name, setName] = useState("")
  const [name_debounced] = useDebounce(name, 2000)
  const [location, setLocation] = useState("")
  const [location_debounced] = useDebounce(location, 2000)
  const [accessCode, setAccessCode] = useState("")
  const [accessCode_debounced] = useDebounce(accessCode, 2000)

  const [PDEid, setPDEid] = useState()
  const [PDEindex, setPDEindex] = useState()

  const iface = new utils.Interface(HOURabi)

  const { config, error } = usePrepareContractWrite({
    address: "0x3807DAB03E8519F0F4f4c37568E27a71B138d47b",
    abi: HOURabi,
    functionName: "onboardPDE",
    args: [name_debounced, location_debounced, appState.account.address, accessCode_debounced],
    enabled: Boolean(name_debounced && location_debounced && accessCode_debounced)
  })

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)

  async function getReceipt(hash) {
    let receipt = await waitForTransaction({ hash })
    console.log(receipt)

    return receipt
  }

  async function getEventResults(txReceipt) {
    const { data, topics } = await txReceipt.logs[0]

    if (data && topics) {
      const eventResults = iface.parseLog({ data, topics })
      console.log(eventResults)
      setName(eventResults.args[0])
      setLocation(eventResults.args[1])
      setPDEid(eventResults.args[3].toString())
      setPDEindex(eventResults.args[4].toString())
      setAccessCode(eventResults.args[5].toString())
    }
  }

  useEffect(() => {
    if (error) {
      console.log("error from prepare", error)
    }
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
      <div className={"interface__function-title " + (appState.functionIndex == 1 ? "" : "non-visible")}>
        <p>Onboard PDE.</p>
      </div>

      {isLoading ? (
        <form className={"interface__function-field " + (appState.functionIndex == 1 ? "" : "non-visible")}>
          <div className="dots-loading">
            <div></div>
          </div>
        </form>
      ) : isSuccess ? (
        <form className={"interface__function-field interface__function-field--overflow " + (appState.functionIndex == 1 ? "" : "non-visible")}>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Event Result
              <div className="icon-twitter">
                <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=Come%20spend%20your%20next%20happy%20hour%20at%20my%20PDE!&via=happyhourDAO">
                  <MdShare className="icon icon-share" />
                </a>
              </div>
            </div>
            <div className="interface__function-field__results-row-bottom">You are a PDE owner!</div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">PDE Name</div>
            <div className="interface__function-field__results-row-bottom">{name}</div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">PDE Location</div>
            <div className="interface__function-field__results-row-bottom">{location}</div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              PDE ID
              <CopyToClipboard text={PDEid} onCopy={copiedPopup}>
                <span id="copiedElement">
                  <MdCopyAll className="icon icon-copy" />
                </span>
              </CopyToClipboard>
              <a href="https://mirror.xyz/0x2b776aa3C2389D6a3B7b11cd99Fdb94190bAF75b/l1ZcyqpInuxp_4WpkVCGFINWhXHpcmIRwBK-QQCZ4hU" target="_blank">
                <MdReadMore className="icon icon-read" />
              </a>
            </div>
            <div className="interface__function-field__results-row-bottom interface__function-field__results-row-bottom--ellipsis">
              {PDEid ? (
                PDEid
              ) : (
                <div data-text="Confirming..." className="interface__function-field__results-row-bottom--loading">
                  Confirming...
                </div>
              )}
            </div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">PDE Index</div>
            <div className="interface__function-field__results-row-bottom">
              {PDEindex ? (
                PDEindex
              ) : (
                <div data-text="Confirming..." className="interface__function-field__results-row-bottom--loading">
                  Confirming...
                </div>
              )}
            </div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">PDE Access Code</div>
            <div className="interface__function-field__results-row-bottom">{accessCode}</div>
          </div>

          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Notes
              <a href="https://mirror.xyz/0x2b776aa3C2389D6a3B7b11cd99Fdb94190bAF75b/l1ZcyqpInuxp_4WpkVCGFINWhXHpcmIRwBK-QQCZ4hU" target="_blank">
                <MdReadMore className="icon icon-read" />
              </a>
            </div>
            <div className="interface__function-field__results-row-bottom">As a PDE owner, you are eligible to earn commission on $HOUR earned by Drinkers.</div>
          </div>
        </form>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()
            writeAsync?.()
              .then(hash => {
                getReceipt(hash.hash).then(txReceipt => getEventResults(txReceipt))
              })
              .catch(console.error)
          }}
          className={"interface__function-field interface__function-field--overflow " + (appState.functionIndex == 1 ? "" : "non-visible")}
        >
          <div className="input-box">
            <input type="text" onChange={e => setName(e.target.value)} required />
            <span>name</span>
          </div>
          <div className="input-box">
            <input type="text" onChange={e => setLocation(e.target.value)} required />
            <span>location</span>
          </div>
          <div className="input-box">
            <input type="text" onChange={e => setAccessCode(e.target.value)} required />
            <span>access code</span>
          </div>
          <div className="input-box">
            <button disabled={!writeAsync} className={writeAsync ? "" : "button--disabled"} onClick={() => console.log(writeAsync)}>
              button
            </button>
            {error ? <div className="usePrepare-error">Invalid PDE onboarding credentials.</div> : ""}
          </div>
        </form>
      )}
    </>
  )
}

export default OnboardPDE
