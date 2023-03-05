import React, { useEffect, useContext, useState } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { useDebounce } from "use-debounce"
import { MdReadMore, MdShare } from "react-icons/md"

// IMPORTING WAGMI REACT HOOKS
import { usePrepareContractWrite } from "wagmi"
import { useContractWrite } from "wagmi"
import { ethers } from "ethers"

function EndLITT({ HOURabi }) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [hoursSpentDrinking, setHoursSpentDrinking] = useState()
  const [HOURearned, setHOURearned] = useState()

  const iface = new ethers.utils.Interface(HOURabi)

  const { config, error } = usePrepareContractWrite({
    address: "0x6e164B660fc4e6bB0298bAE28D62622E47C2C834",
    abi: HOURabi,
    functionName: "endHOUR",
    args: [appState.account.address],
    enabled: Boolean(appState.account.currentDrinkingID.length > 1)
  })

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)

  async function getEventResults(txReceipt) {
    const { data, topics } = await txReceipt.logs[2]

    if (data && topics) {
      const eventResults = iface.parseLog({ data, topics })
      console.log(eventResults)
      setHoursSpentDrinking(eventResults.args[0].toString())
      setHOURearned(eventResults.args[1].toString())
      appDispatch({ type: "setDrinkingID", value: 0 })
    }
  }

  useEffect(() => {
    console.log("error from prepare", error)
  }, [error])

  return (
    <>
      <div className={"interface__function-title " + (appState.functionIndex == 3 ? "" : "non-visible")}>
        <p>End $HOUR.</p>
      </div>

      {isLoading ? (
        <form className={"interface__function-field " + (appState.functionIndex == 3 ? "" : "non-visible")}>
          <div className="dots-loading">
            <div></div>
          </div>
        </form>
      ) : isSuccess ? (
        <form className={"interface__function-field interface__function-field--overflow " + (appState.functionIndex == 3 ? "" : "non-visible")}>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Event Result
              <div className="icon-twitter">
                <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=I%20earned%20$HOUR%20by%20the%20hour!&via=happyhourDAO">
                  <MdShare className="icon icon-share" />
                </a>
              </div>
            </div>
            <div className="interface__function-field__results-row-bottom">{hoursSpentDrinking ? "You just spent " + hoursSpentDrinking + " hours getting LITT!" : "Loading..."}</div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Total $HOUR Earned
              <MdReadMore className="icon icon-read" />
            </div>
            <div className="interface__function-field__results-row-bottom interface__function-field__results-row-bottom--ellipsis">{HOURearned ? "You just earned " + HOURearned + " $HOUR tokens." : "Loading..."}</div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Notes
              <MdReadMore className="icon icon-read" />
            </div>
            <div className="interface__function-field__results-row-bottom">Use your $HOUR tokens to gain rewards or burn them to mint the $DRNK governance token.</div>
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
          className={"interface__function-field " + (appState.functionIndex == 3 ? "" : "non-visible")}
        >
          <div className="input-box">
            <input type="text" disabled={appState.account.currentDrinkingID == 0} value={appState.account.currentDrinkingID == 0 ? "" : appState.account.address} />
            <span>drinker address</span>
          </div>
          <div className="input-box">
            <button disabled={appState.account.currentDrinkingID == 0} className={appState.account.currentDrinkingID == 0 ? "button--disabled" : ""} onClick={() => console.log(writeAsync)}>
              button
            </button>
            {error ? <div className="usePrepare-error">Inputted drinker address doesn't match yours.</div> : ""}
            {appState.account.currentDrinkingID == 0 ? <div className="usePrepare-error">You haven't started a LITT session.</div> : ""}
          </div>
        </form>
      )}
    </>
  )
}

export default EndLITT
