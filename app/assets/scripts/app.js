import "../styles/styles.css"

// Importing React dependecies

import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"

// Import React components

import Dashboard from "./components/Dashboard"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Hero from "./components/Hero"

function Main() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
