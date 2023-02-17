import React, { useEffect, useContext } from "react"
import HOUR_Commission_Card from "./HOUR_Commission_Card"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

// const HOURcommission_array = [
//   {
//     a: [
//       {
//         blockNumber: 1234567,
//         commission: 50
//       },
//       {
//         blockNumber: 69696969,
//         commission: 50
//       }
//     ],
//     b: 100
//   },
//   {
//     a: [],
//     b: 0
//   },
//   {
//     a: [],
//     b: 0
//   }
// ]

function HOUR_Commission_Pagination({ index, setViewingCommission }) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  return (
    <>
      <HOUR_Commission_Card index={index} commissionArray={appState.PDEownership.commissionArray} setViewingCommission={setViewingCommission} />
    </>
  )
}

export default HOUR_Commission_Pagination
