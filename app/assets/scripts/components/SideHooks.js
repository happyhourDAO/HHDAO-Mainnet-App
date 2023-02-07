import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

// IMPORTING WAGMI REACT HOOKS
import { useContractRead } from "wagmi"

function SideHooks() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const getDrinkingId = useContractRead({
    address: appState.HOURnetwork.contractObject.address,
    abi: appState.HOURnetwork.contractObject.interface,
    functionName: "drinkingID",
    args: [appState.account.address],
    watch: false,
    onSettled(data, error) {
      console.log("getPoolDrinkingId hook RAN!", { data, error })
      console.log(parseInt(data.toString().slice(-7)))
      appDispatch({ type: "setDrinkingID", value: data })
    }
  })

  const getDrinkingID_to_PDEid = useContractRead({
    address: appState.HOURnetwork.contractObject.address,
    abi: appState.HOURnetwork.contractObject.interface,
    functionName: "drinkingIDtoPDEid",
    args: [appState.account.currentDrinkingID],
    watch: false,
    onSettled(data, error) {
      console.log("getDrinkingID_to_PDEid hook RAN!", { data, error })
      console.log(parseInt(data.toString().slice(-7)))
      appDispatch({ type: "setDrinkingID_to_PDEid", value: data })
    }
  })

  return <></>
}

export default SideHooks
