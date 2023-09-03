import React, { useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

// IMPORTING WAGMI REACT HOOKS
import { useContractRead } from "wagmi"

function SideHooks() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const getDrinkingId = useContractRead({
    address: appState.HOURnetwork.contractAddress,
    abi: appState.HOURnetwork.contractObject.abi,
    functionName: "drinkingID",
    args: [appState.account.address],
    watch: true,
    onSettled(data, error) {
      if (data) {
        // data returns as bigint
        appDispatch({ type: "setDrinkingID", value: data.toString() })
      }

      if (error) {
        console.error(error)
      }
    }
  })

  const getDrinkingID_to_PDEid = useContractRead({
    address: appState.HOURnetwork.contractAddress,
    abi: appState.HOURnetwork.contractObject.abi,
    functionName: "drinkingIDtoPDEid",
    args: [appState.account.currentDrinkingID],
    watch: appState.account.currentDrinkingID === 0 ? false : true,
    onSettled(data, error) {
      if (data) {
        // data returns as bigint
        appDispatch({ type: "setDrinkingID_to_PDEid", value: data.toString() })
      }

      if (error) {
        console.error(error)
      }
    }
  })

  return <></>
}

export default SideHooks
