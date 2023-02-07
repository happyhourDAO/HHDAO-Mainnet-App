import React, { useEffect, useContext, useState, useMemo } from "react"
import Footer from "./Footer"
import InterfaceTop from "./InterfaceTop"
import InterfaceBottom from "./InterfaceBottom"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"
import { ethers } from "ethers"

// IMPORTING WAGMI REACT HOOKS
import { useBalance } from "wagmi"
import { useAccount } from "wagmi"
import { useContract } from "wagmi"
import { useContractRead } from "wagmi"
import { useContractReads } from "wagmi"
import { useContractInfiniteReads, paginatedIndexesConfig } from "wagmi"
import { BigNumber } from "ethers"

// IMPORTING COMPONENTS
import SideHooks from "./SideHooks"
import SettingsModal from "./SettingsModal"

// IMPORTING OF HOURv3 & DRNKv3 CONTRACT ABI
const HOURabi = require("../contracts/HOURv3.json")

function Dashboard(props) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  // Settings Modal Operation
  const [open, setOpen] = useState(true)

  function toggleSettings() {
    setOpen(!open)
  }

  // Retrieve account data from WAGMI
  const { address, status } = useAccount({
    onConnect({ address }) {
      console.log("useAccount hook RAN!", address)
    }
  })

  useEffect(() => {
    appDispatch({ type: "setAccountAddress", value: address })
    console.log("useEffect to set address RAN!")
  }, [address])

  const { data, isLoading } = useBalance({
    address,
    token: "0x6e164B660fc4e6bB0298bAE28D62622E47C2C834",
    watch: false,
    onSettled(data, error) {
      console.log("useBalance HOUR hook RAN!", { data, error })
      appDispatch({ type: "setAmountHOUR", value: data.value / 10 ** 18 })
    }
  })

  const { dataDRNK, isLoadingDRNK } = useBalance({
    address,
    token: "0x89f1a702EEcFB47cF9289B3481349e1f38367C44",
    watch: false,
    onSettled(data, error) {
      console.log("useBalance DRNK hook RAN!", { data, error })

      appDispatch({ type: "setAmountDRNK", value: data.value / 10 ** 18 })
    }
  })

  // RETRIEVE CONTRACT DATA VIA WAGMI

  // const HOURcontract = useContract({
  //   address: "0x6e164B660fc4e6bB0298bAE28D62622E47C2C834",
  //   abi: HOURabi,
  //   signerOrProvider: props.provider
  // })

  // useEffect(() => {
  //   appDispatch({ type: "setHOURcontract", data: HOURcontract })
  //   console.log("useEffect for setting HOUR contract RAN!")
  // }, [HOURcontract])

  // CONTRACT READ METHODS

  // const HOURcontract_multipleREAD = useContractReads({
  //   contracts: [
  //     {
  //       address: HOURcontract.address,
  //       abi: HOURcontract.interface,
  //       functionName: "totalPDE"
  //     },
  //     {
  //       address: HOURcontract.address,
  //       abi: HOURcontract.interface,
  //       functionName: "getNumberOfCurrentDrinkers"
  //     },
  //     {
  //       address: HOURcontract.address,
  //       abi: HOURcontract.interface,
  //       functionName: "totalSupply"
  //     }
  //   ],
  //   allowFailure: true,
  //   watch: false,
  //   onSettled(data) {
  //     appDispatch({ type: "setHOURnetworkStats", data: data })
  //     console.log("useContractReads hook RAN!", data)
  //   }
  // })

  async function verifyPDEownership() {
    let array = []

    for (let i = 0; i < appState.HOURnetwork.totalPDE; i++) {
      await HOURcontract.PDEtoOwner(i).then(res => {
        if (res == address) {
          array.push(i)
        }
      })
    }

    return array
  }

  // useEffect(() => {
  //   verifyPDEownership()
  //     .then(res => {
  //       if (!res.length) {
  //         null
  //       } else {
  //         appDispatch({ type: "setIsPDEowner" })
  //         appDispatch({ type: "set_PDEownership_indexArray", data: res })
  //       }
  //     })
  //     .catch(console.error)

  //   console.log("useEffect for verifyPDEownership RAN!")
  // }, [appState.account.address, appState.HOURnetwork.totalPDE])

  async function PDEdetails_mapping() {
    let promiseArray = []

    if (appState.PDEownership.indexArray.length) {
      let array = appState.PDEownership.indexArray.map(async function (index) {
        let retrieved_name = null
        let retrieved_location = null
        let retrieved_address = null
        let retrieved_accessCode = null
        let retrieved_PDEid = null

        await HOURcontract.pdes(index).then(res => {
          retrieved_name = res["_name"]
          retrieved_location = res["_location"]
          retrieved_address = res["_address"]
          retrieved_accessCode = res["_accessCode"]
          retrieved_PDEid = res["_PDEid"]
        })

        return {
          PDEname: retrieved_name,
          PDElocation: retrieved_location,
          PDEaddress: retrieved_address,
          PDEaccessCode: retrieved_accessCode,
          PDEid: retrieved_PDEid
        }
      })

      promiseArray = await Promise.all(array)
    }

    return promiseArray
  }

  async function retrieve_historical_PDE_commission(PDE_i) {
    let historical_HOUR_commission_earned = 0

    let array = await HOURcontract.queryFilter("endHOURresults", undefined, undefined).then().catch(console.error)

    let filteredArray = await array.filter(function (eventObject) {
      let PDEindex = eventObject.args[3].toNumber()

      return PDEindex == PDE_i
    })

    let mappedArray = await filteredArray.map(function (filteredArrayObject) {
      historical_HOUR_commission_earned += filteredArrayObject.args[2] / 10 ** 18

      return {
        blockNumber: filteredArrayObject.blockNumber,
        HOURcommissionEarned: filteredArrayObject.args[2] / 10 ** 18
      }
    })

    return {
      a: mappedArray,
      b: historical_HOUR_commission_earned
    }
  }

  async function retrieve_historical_PDE_commission_array() {
    let completed_histCommissionArray = []

    if (appState.PDEownership.indexArray.length) {
      let histCommissionArray = appState.PDEownership.indexArray.map(async function (i) {
        let index_historical_commission

        await retrieve_historical_PDE_commission(i)
          .then(res => (index_historical_commission = res))
          .catch(console.error)

        return index_historical_commission
      })

      completed_histCommissionArray = await Promise.all(histCommissionArray)
    }

    return completed_histCommissionArray
  }

  // useEffect(() => {
  //   PDEdetails_mapping()
  //     .then(res => {
  //       console.log("PDEownership.structArray", res)
  //       appDispatch({ type: "set_PDEownership_structArray", data: res })
  //     })
  //     .catch(console.error)

  //   retrieve_historical_PDE_commission_array()
  //     .then(res => {
  //       console.log("PDEownership.commissionArray", res)
  //       appDispatch({ type: "set_PDEownership_commissionArray", data: res })
  //     })
  //     .catch(console.error)

  //   console.log("useEffect for PDEdetails_mapping & historical_PDE_commission RAN!")
  // }, [appState.account.isPDEowner == true])

  return (
    <>
      {appState.account.address ? <SideHooks /> : null}
      <div className="container">
        <div className="dashboard">
          {open ? <SettingsModal toggleSettings={toggleSettings} /> : ""}

          <div className="dashboard__left-module">
            <section className="interface interface__top">
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
              <p className="stats-board--gray-color">The happyhourDAO will be powered by the Happy Hour Protocol Engine, which is the heart and soul of the whole ecosystem. This is what will glue together the drinkers, Participating Drinking Establishments &#40;PDEs&#41;, devs, investors, and other stakeholders.</p>
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
              <a href="" className="stats-board__contracts--link-styling">
                0x6e164B660fc4e6bB0298bAE28D62622E47C2C834
              </a>
              <p className="stats-board--gray-color stats-board--no-margin-bottom">DRNKgovernance:</p>
              <a href="" className="stats-board__contracts--link-styling">
                0x89f1a702eecfb47cf9289b3481349e1f38367c44
              </a>
            </section>
            <section className="stats-board__rates">
              <h3 className="stats-board--label-font">Live Rates</h3>
              <p className="stats-board--gray-color stats-board--no-margin">
                $HOUR / hour = <span className="stats-board__rates--flashing">100</span>
              </p>
              <p className="stats-board--gray-color stats-board--no-margin">
                Happy Hour Fee = <span className="stats-board__rates--flashing">0.01</span> ETH
              </p>
              <p className="stats-board--gray-color stats-board--no-margin">
                HOUR burn minimum = <span className="stats-board__rates--flashing">2000</span> $HOUR
              </p>
              <p className="stats-board--gray-color stats-board--no-margin">
                PDE commission = <span className="stats-board__rates--flashing">10%</span>
              </p>
              <p className="stats-board--gray-color stats-board--no-margin">
                $HOUR / $DRNK = <span className="stats-board__rates--flashing">1 / 10</span>
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
