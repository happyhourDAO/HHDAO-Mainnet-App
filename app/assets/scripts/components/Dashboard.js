import React, { useEffect, useContext, useState, useRef } from "react"
import Footer from "./Footer"
import InterfaceTop from "./InterfaceTop"
import InterfaceBottom from "./InterfaceBottom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

// IMPORTING WAGMI REACT HOOKS
import { useBalance } from "wagmi"
import { useAccount } from "wagmi"
import { getContract } from "@wagmi/core"
import { useContractReads } from "wagmi"

// IMPORTING COMPONENTS
import SideHooks from "./SideHooks"
import SettingsModal from "./SettingsModal"

// IMPORTING OF HOURv3 & DRNKv3 CONTRACT ABI
const HOURabi = require("../contracts/HOURv3.json")

function Dashboard(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  // Settings Modal Operation
  const [open, setOpen] = useState(false)

  function toggleSettings() {
    setOpen(!open)
  }

  const settingsModalRef = useRef()

  useEffect(() => {
    let handler = (e) => {
      if (!settingsModalRef.current.contains(e.target)) {
        toggleSettings()
      }
    }

    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  // RETRIEVE ACCOUNT ADDRESS

  const { address, connector, status } = useAccount({
    onConnect({ address }) {
      console.log("useAccount hook RAN!", address)
    },
  })

  useEffect(() => {
    appDispatch({ type: "setAccountAddress", value: address })
  }, [address])

  // RETRIEVE ACCOUNT $HOUR & $DRNK BALANCES

  const balanceHOUR = useBalance({
    address,
    token: appState.HOURnetwork.contractAddress,
    watch: true,
    onSettled(data, error) {
      appDispatch({ type: "setAmountHOUR", value: data.formatted })
    },
  })

  const balanceDRNK = useBalance({
    address,
    token: appState.DRNKnetwork.contractAddress,
    watch: true,
    onSettled(data, error) {
      appDispatch({ type: "setAmountDRNK", value: data.formatted })
    },
  })

  // RETRIEVE CONTRACT DATA VIA WAGMI

  const HOURcontract = getContract({
    address: appState.HOURnetwork.contractAddress,
    abi: HOURabi,
    publicClient: props.provider,
  })

  useEffect(() => {
    appDispatch({ type: "setHOURcontract", data: HOURcontract })
    console.log(HOURcontract)
  }, [])

  // RETRIEVE happyhourDAO NETWORK STATS

  const HOURcontract_multipleREAD = useContractReads({
    contracts: [
      {
        address: HOURcontract.address,
        abi: HOURcontract.abi,
        functionName: "totalPDE",
      },
      {
        address: HOURcontract.address,
        abi: HOURcontract.abi,
        functionName: "getNumberOfCurrentDrinkers",
      },
      {
        address: HOURcontract.address,
        abi: HOURcontract.abi,
        functionName: "totalSupply",
      },
    ],
    allowFailure: true,
    watch: true,
    onSettled(data) {
      appDispatch({ type: "setHOURnetworkStats", data: data })
    },
  })

  // VERIFY PDE OWNERSHIP & INDEX ARRAY

  async function verifyPDEownership() {
    let array = []

    for (let i = 0; i < appState.HOURnetwork.totalPDE; i++) {
      await HOURcontract.read.PDEtoOwner([i]).then((res) => {
        if (res == appState.account.address) {
          array.push(i)
        }
      })
    }

    return array
  }

  useEffect(() => {
    if (appState.account.address) {
      verifyPDEownership()
        .then((res) => {
          if (!res.length) {
            null
          } else {
            appDispatch({ type: "setIsPDEowner" })
            appDispatch({ type: "set_PDEownership_indexArray", data: res })
          }
        })
        .catch(console.error)
    }
  }, [appState.account.address, appState.HOURnetwork.totalPDE])

  // RETRIEVE PDE DETAILS ARRAY

  async function PDEdetails_mapping() {
    let promiseArray = []

    if (appState.PDEownership.indexArray.length) {
      let array = appState.PDEownership.indexArray.map(async function (index) {
        let retrieved_name = null
        let retrieved_location = null
        let retrieved_address = null
        let retrieved_accessCode = null
        let retrieved_PDEid = null

        await HOURcontract.read.pdes([index]).then((res) => {
          retrieved_name = res[0]
          retrieved_location = res[1]
          retrieved_address = res[2]
          retrieved_accessCode = res[3].toString()
          retrieved_PDEid = res[4].toString()
        })

        return {
          PDEname: retrieved_name,
          PDElocation: retrieved_location,
          PDEaddress: retrieved_address,
          PDEaccessCode: retrieved_accessCode,
          PDEid: retrieved_PDEid,
        }
      })

      promiseArray = await Promise.all(array)
    }

    return promiseArray
  }

  // RETRIEVE HISTORICAL PDE COMMISSION AMOUNTS

  async function retrieve_historical_PDE_commission(PDE_i) {
    let historical_HOUR_commission_earned = 0

    let array = await appState.ethers.contractHOUR.queryFilter("endHOURresults", undefined, undefined).then().catch(console.error)

    let filteredArray = await array.filter(function (eventObject) {
      let PDEindex = eventObject.args[3].toNumber()

      return PDEindex == PDE_i
    })

    let mappedArray = await filteredArray.map(function (filteredArrayObject) {
      historical_HOUR_commission_earned += filteredArrayObject.args[2] / 10 ** 18

      return {
        blockNumber: filteredArrayObject.blockNumber,
        HOURcommissionEarned: filteredArrayObject.args[2] / 10 ** 18,
      }
    })

    return {
      a: mappedArray,
      b: historical_HOUR_commission_earned,
    }
  }

  async function retrieve_historical_PDE_commission_array() {
    let completed_histCommissionArray = []

    if (appState.PDEownership.indexArray.length) {
      let histCommissionArray = appState.PDEownership.indexArray.map(async function (i) {
        let index_historical_commission

        await retrieve_historical_PDE_commission(i)
          .then((res) => (index_historical_commission = res))
          .catch(console.error)

        return index_historical_commission
      })

      completed_histCommissionArray = await Promise.all(histCommissionArray)
    }

    return completed_histCommissionArray
  }

  useEffect(() => {
    PDEdetails_mapping()
      .then((res) => {
        console.log("PDEownership.structArray", res)
        appDispatch({ type: "set_PDEownership_structArray", data: res })
      })
      .catch(console.error)

    retrieve_historical_PDE_commission_array()
      .then((res) => {
        console.log("PDEownership.commissionArray", res)
        appDispatch({ type: "set_PDEownership_commissionArray", data: res })
      })
      .catch(console.error)
  }, [appState.account.isPDEowner == true])

  return (
    <>
      {appState.account.address ? <SideHooks /> : null}
      <div className="container">
        <div className="dashboard">
          {open ? (
            <div ref={settingsModalRef}>
              <SettingsModal provider={props.provider} />
            </div>
          ) : (
            ""
          )}

          <div className="dashboard__left-module">
            <section className="interface interface__top">
              <div className="network-status">
                mainnet &#91;eip155:1&#93;: <div className={"network-status__circle " + (appState.HOURnetwork.contractObject ? "network-status__circle--connected" : "network-status__circle--disconnected")}></div>
              </div>
              <InterfaceTop />
            </section>
            <section className="interface interface__bottom">
              <InterfaceBottom />
            </section>
          </div>
          <div className="dashboard__right-module">
            <section className="stats-board__description">
              <img onClick={toggleSettings} className="stats-board__description-icon" src="./assets/images/Settings-Icon.svg" alt="Settings-Icon" />
              <h3 className="stats-board--no-margin stats-board--label-font">About</h3>
              <p style={{ fontSize: ".9em" }} className="stats-board--gray-color">
                The happyhourDAO Dashboard is your virtual interface with the Happy Hour Protocol Engine. This will allow you to interact with the HOURv3 smart contract to onboard as a PDE, start & end a LITT session, and to burn $HOUR for $DRNK. Click the settings gear icon &#40;on the top right&#41; to view your current status in the ecosystem.
              </p>
            </section>
            <section className="stats-board__index">
              <p className="stats-board__index-container">
                <img className="stats-board__index-icon" src="./assets/images/PDE-Icon.svg" alt="PDE-Icon" />
                <span className="stats-board__index--larger stats-board__index--dark-purple stats-board__index--flashing">{appState.HOURnetwork.totalPDE}</span>
                <span className="stats-board--gray-color">PDEs</span>
              </p>
              <p className="stats-board__index-container">
                <img className="stats-board__index-icon" src="./assets/images/Drinker-Icon.svg" alt="Drinker-Icon" />
                <span className="stats-board__index--larger stats-board__index--dark-purple stats-board__index--flashing">{appState.HOURnetwork.totalCurrentDrinkers}</span>
                <span className="stats-board--gray-color">Drinkers</span>
              </p>
            </section>
            <section className="stats-board__contracts">
              <h3 className="stats-board--label-font">Deployed Contracts</h3>
              <p className="stats-board--gray-color stats-board--no-margin">HappyHourProtocolv3:</p>
              <a href={"https://etherscan.io/address/" + (appState.HOURnetwork.contractAddress ? appState.HOURnetwork.contractAddress : "")} target="_blank" className="stats-board__contracts--link-styling">
                {appState.HOURnetwork.contractAddress ? appState.HOURnetwork.contractAddress : "Loading..."}
              </a>
              <p className="stats-board--gray-color stats-board--no-margin-bottom">DRNKgovernance:</p>
              <a href={"https://etherscan.io/address/" + appState.DRNKnetwork.contractAddress} target="_blank" className="stats-board__contracts--link-styling">
                {appState.DRNKnetwork.contractAddress}
              </a>
            </section>
            <section className="stats-board__rates">
              <h3 className="stats-board--label-font">Live Rates</h3>
              <p className="stats-board--gray-color stats-board--no-margin">
                $HOUR / hour = <span className="stats-board__rates--flashing">{appState.HOURnetwork.HOURperhour}</span>
              </p>
              <p className="stats-board--gray-color stats-board--no-margin">
                Happy Hour Fee = <span className="stats-board__rates--flashing">{appState.HOURnetwork.HappyHourFee}</span> ETH
              </p>
              <p className="stats-board--gray-color stats-board--no-margin">
                $HOUR burn minimum = <span className="stats-board__rates--flashing">{appState.HOURnetwork.HOUR2DRNKburnMinimum}</span> $HOUR
              </p>
              <p className="stats-board--gray-color stats-board--no-margin">
                PDE commission = <span className="stats-board__rates--flashing">{Number(appState.HOURnetwork.PDEcommission).toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 })}</span>
              </p>
              <p className="stats-board--gray-color stats-board--no-margin">
                $HOUR / $DRNK = <span className="stats-board__rates--flashing">{appState.HOURnetwork.HOUR2DRNKratio}</span>
              </p>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default Dashboard
