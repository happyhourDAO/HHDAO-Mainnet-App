import React, { useState, useContext } from "react"
import HOUR_Commission_Pagination from "./HOUR_Commission_Pagination"
import PDE_Card from "./PDE_Card"
import StateContext from "../StateContext"

function PDE_Pagination({ viewingCommission, setViewingStruct, setViewingCommission }) {
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
