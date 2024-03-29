import React, { useEffect, useContext, useState } from "react"
import StateContext from "../StateContext"
import { useDebounce } from "use-debounce"
import { MdReadMore, MdShare } from "react-icons/md"

// IMPORTING WAGMI REACT HOOKS
import { usePrepareContractWrite } from "wagmi"
import { useContractWrite } from "wagmi"
import { waitForTransaction } from "wagmi/actions"
import { utils } from "ethers"

function MintDRNK({ HOURabi }) {
  const appState = useContext(StateContext)

  const [burnAmount, setBurnAmount] = useState(0)
  const [burnAmount_debounced] = useDebounce(burnAmount, 2000)

  const [HOURburned, setHOURburned] = useState()
  const [DRNKminted, setDRNKminted] = useState()

  const iface = new utils.Interface(HOURabi)

  const { config, error } = usePrepareContractWrite({
    address: appState.HOURnetwork.contractAddress,
    abi: HOURabi,
    functionName: "mintyDRNK",
    args: [appState.DRNKnetwork.contractAddress, appState.account.address, burnAmount_debounced],
    enabled: burnAmount_debounced
  })

  const { data, isLoading, isSuccess, writeAsync } = useContractWrite(config)

  async function getReceipt(hash) {
    let receipt = await waitForTransaction({ hash })
    console.log(receipt)

    return receipt
  }

  async function getEventResults(txReceipt) {
    const { data, topics } = await txReceipt.logs[2]

    if (data && topics) {
      const eventResults = iface.parseLog({ data, topics })
      console.log(eventResults)
      setHOURburned(parseInt(eventResults.args[0].toString()))
      setDRNKminted(parseInt(eventResults.args[1].toString()) / 10 ** 18)
    }
  }

  useEffect(() => {
    if (error) {
      console.log("error from prepare", error)
    }
  }, [error])

  return (
    <>
      <div className={"interface__function-title " + (appState.functionIndex == 4 ? "" : "non-visible")}>
        <p>Mint $DRNK.</p>
      </div>
      {isLoading ? (
        <form className={"interface__function-field " + (appState.functionIndex == 4 ? "" : "non-visible")}>
          <div className="dots-loading">
            <div></div>
          </div>
        </form>
      ) : isSuccess ? (
        <form className={"interface__function-field interface__function-field--overflow " + (appState.functionIndex == 4 ? "" : "non-visible")}>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Event Result
              <div className="icon-twitter">
                <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=Got%20$DRNK%20&via=happyhourDAO">
                  <MdShare className="icon icon-share" />
                </a>
              </div>
            </div>
            <div className="interface__function-field__results-row-bottom">
              {HOURburned ? (
                "You just burned " + HOURburned + " $HOUR."
              ) : (
                <div data-text="Confirming..." className="interface__function-field__results-row-bottom--loading">
                  Confirming...
                </div>
              )}
            </div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Total $DRNK Minted
              <a href="https://happy-hour-1.gitbook.io/happyhourdao/the-happyhourdao/usddrnk-governance-tokenomics" target="_blank">
                <MdReadMore className="icon icon-read" />
              </a>
            </div>
            <div className="interface__function-field__results-row-bottom interface__function-field__results-row-bottom--ellipsis">
              {DRNKminted ? (
                "You just minted " + DRNKminted + " $DRNK."
              ) : (
                <div data-text="Confirming..." className="interface__function-field__results-row-bottom--loading">
                  Confirming...
                </div>
              )}
            </div>
          </div>
          <div className="interface__function-field__results-row">
            <div className="interface__function-field__results-row-top">
              Notes
              <a href="https://happy-hour-1.gitbook.io/happyhourdao/the-happyhourdao/usddrnk-governance-tokenomics" target="_blank">
                <MdReadMore className="icon icon-read" />
              </a>
            </div>
            <div className="interface__function-field__results-row-bottom">Use your $DRNK governance tokens to participate in the happyhourDAO ecosystem.</div>
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
          className={"interface__function-field " + (appState.functionIndex == 4 ? "" : "non-visible")}
        >
          <div className="input-box">
            <input type="text" disabled={appState.account.amountHOUR < appState.HOURnetwork.HOUR2DRNKburnMinimum} onChange={e => setBurnAmount(e.target.value)} required />
            <span>$HOUR burn amount</span>
          </div>
          <div className="input-box">
            <button disabled={appState.account.amountHOUR < appState.HOURnetwork.HOUR2DRNKburnMinimum || burnAmount < appState.HOURnetwork.HOUR2DRNKburnMinimum} className={appState.account.amountHOUR < appState.HOURnetwork.HOUR2DRNKburnMinimum || burnAmount < appState.HOURnetwork.HOUR2DRNKburnMinimum ? "button--disabled" : ""} onClick={() => console.log(writeAsync)}>
              button
            </button>
            {error ? <div className="usePrepare-error">Invalid $HOUR minimum burn amount.</div> : ""}
            {appState.account.amountHOUR < appState.HOURnetwork.HOUR2DRNKburnMinimum ? <div className="usePrepare-error">You don't have enough $HOUR to burn.</div> : ""}
          </div>
        </form>
      )}
    </>
  )
}

export default MintDRNK
