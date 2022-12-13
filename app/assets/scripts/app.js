import "../styles/styles.css"

// Import React dependecies

import React from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import React components

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Source from "./components/Source"
import About from "./components/About"

function Main() {
  const initialState = {
    functionIndex: 2
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "changeFunctionIndex":
        draft.functionIndex = action.value
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/source" element={<Source />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
