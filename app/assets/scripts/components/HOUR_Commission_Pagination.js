import React, { useEffect } from "react"
import HOUR_Commission_Card from "./HOUR_Commission_Card"

const HOURcommission_array = [
  {
    a: [
      {
        blockNumber: 1234567,
        commission: 50
      },
      {
        blockNumber: 69696969,
        commission: 50
      }
    ],
    b: 100
  },
  {
    a: [],
    b: 0
  },
  {
    a: [],
    b: 0
  }
]

function HOUR_Commission_Pagination({ index, setViewingCommission }) {
  return (
    <>
      <HOUR_Commission_Card commission={HOURcommission_array[index]} setViewingCommission={setViewingCommission} />
    </>
  )
}

export default HOUR_Commission_Pagination
