import "../styles/styles.css"

// Import React dependecies

import React from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "react-tooltip/dist/react-tooltip.css"

// Import React components

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import Dashboard from "./components/Dashboard"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import Source from "./components/Source"
import About from "./components/About"

// WEB3MODAL & OTHER ETHEREUM LIBRARIES
import { EthereumClient, modalConnectors, walletConnectProvider } from "@web3modal/ethereum"
import { Web3Modal } from "@web3modal/react"
import { configureChains, createClient, WagmiConfig } from "wagmi"
import { mainnet } from "wagmi/chains"

// CONFIGURE WAGMI & WEB3MODAL
const chains = [mainnet]

// wagmi client
const { provider } = configureChains(chains, [walletConnectProvider({ projectId: "b611d14b3c75661ee3a2d0bd6fa02451" })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider
})

// web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains)

function Main() {
  const initialState = {
    functionIndex: 2,
    isMobileMenuOpen: false,
    account: {
      address: "",
      amountHOUR: null,
      amountDRNK: null,
      currentDrinkingID: 0,
      drinkingID_to_PDEid: 0,
      isPDEowner: false
    },
    PDEownership: {
      indexArray: [],
      structArray: [],
      commissionArray: []
    },
    HOURnetwork: {
      contractAddress: "",
      contractObject: null,
      totalPDE: null,
      totalCurrentDrinkers: null,
      totalSupply: null,
      HOUR2DRNKburnMinimum: 2000,
      HOURperhour: 100,
      HappyHourFee: 1 / 100,
      PDEcommission: 10 / 100,
      HOUR2DRNKratio: 1 / 10
    },
    DRNKnetwork: {
      contractAddress: "0xFB3fF47Ab7b5D4fc6fc39aEEE6ce84d0c1062dd0"
    }
  }

  function ourReducer(draft, action) {
    switch (action.type) {
      case "changeFunctionIndex":
        draft.functionIndex = action.value
        return
      case "openMobileMenu":
        draft.isMobileMenuOpen = true
        return
      case "closeMobileMenu":
        draft.isMobileMenuOpen = false
        return
      case "setAccountAddress":
        draft.account.address = action.value
        return
      case "setAmountHOUR":
        draft.account.amountHOUR = action.value
        return
      case "setAmountDRNK":
        draft.account.amountDRNK = action.value
        return
      case "setDrinkingID":
        draft.account.currentDrinkingID = action.value
        return
      case "setDrinkingID_to_PDEid":
        draft.account.drinkingID_to_PDEid = action.value
        return
      case "setIsPDEowner":
        draft.account.isPDEowner = true
        return
      case "set_PDEownership_indexArray":
        draft.PDEownership.indexArray = action.data
        return
      case "set_PDEownership_structArray":
        draft.PDEownership.structArray = action.data
        return
      case "set_PDEownership_commissionArray":
        draft.PDEownership.commissionArray = action.data
        return
      case "setHOURcontract":
        draft.HOURnetwork.contractObject = action.data
        return
      case "setHOURcontractAddress":
        draft.HOURnetwork.contractAddress = action.data
        return
      case "setHOURnetworkStats":
        draft.HOURnetwork.totalPDE = action.data[0].toNumber()
        draft.HOURnetwork.totalCurrentDrinkers = action.data[1].toNumber()
        draft.HOURnetwork.totalSupply = action.data[2] / 10 ** 18
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/dashboard" element={<Dashboard provider={wagmiClient.provider} />} />
                <Route path="/source" element={<Source />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </BrowserRouter>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </WagmiConfig>
      <Web3Modal projectId="b611d14b3c75661ee3a2d0bd6fa02451" ethereumClient={ethereumClient} />
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
