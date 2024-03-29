import React, { useEffect, useContext, useState } from "react"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { IconContext } from "react-icons"
import { Tooltip } from "react-tooltip"
import StateContext from "../StateContext"

function ViewDrinkingLocation_Card(props) {
  const appState = useContext(StateContext)

  const [LITTstart, setLITTstart] = useState()
  const [PDEname, setPDEname] = useState()
  const [PDElocation, setPDElocation] = useState()
  const [LITTduration, setLITTduration] = useState()

  // querying previous events for current Drinking location status

  async function queryDrinkingLocation(toQuery_PDEid) {
    let queryArray = await props.provider.getLogs({
      address: appState.HOURnetwork.contractAddress,
      // newPDEonboarded event
      event: appState.HOURnetwork.abi[7],
      fromBlock: 16783136n,
      toBlock: "latest"
    })

    let filteredArray = await queryArray.filter(eventObject => {
      let eventObject_PDEid = eventObject.args._PDEid.toString()

      return eventObject_PDEid == toQuery_PDEid
    })

    if (filteredArray) {
      setPDEname(filteredArray[0].args._name)
      setPDElocation(filteredArray[0].args._location)
    }
  }

  async function queryLITTstart(toQuery_DrinkingID) {
    let queryArray = await props.provider.getLogs({
      address: appState.HOURnetwork.contractAddress,
      // createdDrinkingID event
      event: appState.HOURnetwork.abi[4],
      fromBlock: 16783136n,
      toBlock: "latest"
    })

    let filteredArray = await queryArray.filter(eventObject => {
      let eventObject_DrinkingID = eventObject.args.id.toString()

      return eventObject_DrinkingID == toQuery_DrinkingID
    })

    if (filteredArray) {
      setLITTstart(Number(filteredArray[0].blockNumber))
      timeBetweenBlocks(filteredArray[0].blockNumber)
    }
  }

  useEffect(() => {
    queryDrinkingLocation(appState.account.drinkingID_to_PDEid)
    queryLITTstart(appState.account.currentDrinkingID)
  }, [])

  // Calculating LITT time duration

  async function timeBetweenBlocks(startBlock) {
    let currentBlock = await props.provider.getBlockNumber().then().catch(console.error)

    let currentBlock_timestamp = await props.provider
      .getBlock({ blockNumber: currentBlock })
      .then(block => {
        return block.timestamp
      })
      .catch(console.error)
    let startBlock_timestamp = await props.provider
      .getBlock({ blockNumber: BigInt(startBlock) })
      .then(block => {
        return block.timestamp
      })
      .catch(console.error)

    if (currentBlock_timestamp && startBlock_timestamp) {
      let timeBetween = (Number(currentBlock_timestamp) - Number(startBlock_timestamp)) / 60 / 60

      if (timeBetween) {
        setLITTduration(timeBetween.toFixed(2))
      }
    }
  }

  return (
    <>
      <IconContext.Provider value={{ size: "0.6em" }}>
        <div className="modal-card__row modal-card__row-1">
          Your Drinking Location
          <br />
          <span style={{ fontSize: "0.9em", color: "whitesmoke" }}>PDE Information</span>
          <br />
          <span className="connectivity-label--on">Time/Location Status</span>
          <img onClick={() => props.setViewDrinkingLocation(false)} className="icon icon-back" src="./assets/images/Next-Icon.svg" alt="Back-Icon" />
        </div>
        <div className="modal-card__row modal-card__row-2">
          <div className="modal-card__row-top">
            Time
            <AiOutlineQuestionCircle className="icon icon-more" id="time-info" />
            <Tooltip anchorId="time-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="The time you started your LITT session, captured in Ethereum block number." />
          </div>
          <div className="modal-card__row-bottom">Block #: {LITTstart ? LITTstart : "Querying..."}</div>
        </div>
        <div className="modal-card__row modal-card__row-3">
          <div className="modal-card__row-top">
            Location
            <AiOutlineQuestionCircle className="icon icon-more" id="earned-info" />
            <Tooltip anchorId="earned-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="This is the PDE you are currently getting LITT at." />
          </div>
          <div style={{ fontSize: "1rem" }} className="modal-card__row-bottom">
            {PDEname ? PDEname : "..."} &#64; {PDElocation ? PDElocation : "..."}
          </div>
        </div>
        <div className="modal-card__row modal-card__row-4">
          <div className="modal-card__row-top modal-card__row-top--small-font">
            LITT Duration
            <AiOutlineQuestionCircle className="icon icon-more" id="LITTduration-info" />
            <Tooltip anchorId="LITTduration-info" place="top" className="tooltipExtra" classNameArrow="tooltipExtra__arrow" content="Current time accumulated in current LITT session." />
          </div>
          <div className="modal-card__row-bottom">Hours: {LITTduration ? LITTduration : "Querying..."}</div>
        </div>
      </IconContext.Provider>
    </>
  )
}

export default ViewDrinkingLocation_Card
