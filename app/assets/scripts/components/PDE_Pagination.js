import React, { useEffect, useState } from "react"
import HOUR_Commission_Pagination from "./HOUR_Commission_Pagination"
import PDE_Card from "./PDE_Card"

const indexArray = [0, 2, 4]

const structArray = [
  {
    PDEname: "test1PDE",
    PDElocation: "test1Location",
    PDEaccesscode: 69,
    PDEid: "90c19fd"
  },
  {
    PDEname: "test2PDE",
    PDElocation: "test2Location",
    PDEaccesscode: 123,
    PDEid: "90c19fdf9"
  },
  {
    PDEname: "test3PDE",
    PDElocation: "test3Location",
    PDEaccesscode: 666,
    PDEid: "90c19fdf9"
  }
]

function PDE_Pagination({ viewingCommission, setViewingStruct, setViewingCommission }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(1)

  const lastPostIndex = currentPage * postsPerPage
  const firstPostIndex = lastPostIndex - postsPerPage
  const displayedPosts = structArray.slice(firstPostIndex, lastPostIndex)

  return (
    <>
      {viewingCommission ? (
        <HOUR_Commission_Pagination index={firstPostIndex} setViewingCommission={setViewingCommission} />
      ) : (
        displayedPosts.map((singleStruct, index) => {
          return <PDE_Card key={index} index={index} setViewingStruct={setViewingStruct} setViewingCommission={setViewingCommission} total={structArray.length} PDEname={singleStruct.PDEname} PDElocation={singleStruct.PDElocation} PDEaccesscode={singleStruct.PDEaccesscode} PDEid={singleStruct.PDEid} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        })
      )}
    </>
  )
}

export default PDE_Pagination
