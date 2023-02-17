import React, { useEffect, useState, useContext } from "react"
import HOUR_Commission_Pagination from "./HOUR_Commission_Pagination"
import PDE_Card from "./PDE_Card"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

// const structArray = [
//   {
//     PDEname: "test1PDE",
//     PDElocation: "test1Location",
//     PDEaccesscode: 69,
//     PDEid: "0xab58fd74ff68be1d3d2f8316d73eff1cb94ec21c2c308908a2a214aea2a16dc7"
//   },
//   {
//     PDEname: "test2PDE",
//     PDElocation: "test2Location",
//     PDEaccesscode: 123,
//     PDEid: "0xab58fd74ff68be1d3d2f8316d73eff1cb94ec21c2c308908a2a214aea2a16dc7"
//   },
//   {
//     PDEname: "test3PDE",
//     PDElocation: "test3Location",
//     PDEaccesscode: 666,
//     PDEid: "0xab58fd74ff68be1d3d2f8316d73eff1cb94ec21c2c308908a2a214aea2a16dc7"
//   }
// ]

function PDE_Pagination({ viewingCommission, setViewingStruct, setViewingCommission }) {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(1)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const displayedPosts = appState.PDEownership.structArray.slice(firstPostIndex, lastPostIndex)

  return (
    <>
      {viewingCommission ? (
        <HOUR_Commission_Pagination index={firstPostIndex} setViewingCommission={setViewingCommission} />
      ) : (
        displayedPosts.map((singleStruct, index) => {
          return <PDE_Card key={index} index={index} setViewingStruct={setViewingStruct} setViewingCommission={setViewingCommission} total={appState.PDEownership.structArray.length} PDEname={singleStruct.PDEname} PDElocation={singleStruct.PDElocation} PDEaccesscode={singleStruct.PDEaccessCode} PDEid={singleStruct.PDEid} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        })
      )}
    </>
  )
}

export default PDE_Pagination
