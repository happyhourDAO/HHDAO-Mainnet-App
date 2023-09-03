import "../styles/styles.css"

// Import React dependecies

import React, { Suspense, useEffect } from "react"
import ReactDOM from "react-dom/client"
import { useImmerReducer } from "use-immer"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "react-tooltip/dist/react-tooltip.css"

// Import React components

import StateContext from "./StateContext"
import DispatchContext from "./DispatchContext"
import Header from "./components/Header"
import Hero from "./components/Hero"
const Source = React.lazy(() => import("./components/Source"))
const About = React.lazy(() => import("./components/About"))
const Dashboard = React.lazy(() => import("./components/Dashboard"))
import Fallback from "./components/Fallback"

// IMPORTING ETHERSJS MODULES
import { providers, Contract } from "ethers"

// IMPORTING OF HOURv3 & DRNKv3 CONTRACT ABI
const HOURabi = require("./contracts/HOURv3.json")

// implementation of WalletConnect v2 with wagmi/viem
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { Web3Modal } from "@web3modal/react"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet, goerli } from "wagmi/chains"
import { formatEther } from "viem"

const chains = [mainnet]
const projectId = process.env.WALLETCONNECT_PROJECT_ID

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

console.log(wagmiConfig.publicClient)

function Main() {
  const initialState = {
    onPage: {
      title: "Fallback",
      component: <Fallback />
    },
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
      contractAddress: "0x3807DAB03E8519F0F4f4c37568E27a71B138d47b",
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
    },
    ethers: {
      provider: null,
      signer: null,
      contractHOUR: null
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
        draft.HOURnetwork.totalPDE = action.data[0].result.toString()
        draft.HOURnetwork.totalCurrentDrinkers = action.data[1].result.toString()
        draft.HOURnetwork.totalSupply = formatEther(action.data[2].result)
        return
      case "setEthersProvider":
        draft.ethers.provider = new providers.InfuraProvider(1, process.env.INFURA_PROVIDER_API_KEY)
        return
      case "setEthersContractHOUR":
        draft.ethers.contractHOUR = new Contract(draft.HOURnetwork.contractAddress, HOURabi, draft.ethers.provider)
        return
      case "setOnHero":
        draft.onPage.title = "Hero"
        draft.onPage.component = <Hero />
        sessionStorage.removeItem("shouldPersistPage")
        return
      case "setOnDashboard":
        draft.onPage.title = "Dashboard"
        draft.onPage.component = <Dashboard provider={wagmiConfig.publicClient} />
        sessionStorage.setItem("shouldPersistPage", "Dashboard")
        return
      case "setOnSource":
        draft.onPage.title = "Source"
        draft.onPage.component = <Source />
        sessionStorage.setItem("shouldPersistPage", "Source")
        return
      case "setOnAbout":
        draft.onPage.title = "About"
        draft.onPage.component = <About />
        sessionStorage.setItem("shouldPersistPage", "About")
        return
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  useEffect(() => {
    dispatch({ type: "setEthersProvider" })
    dispatch({ type: "setEthersContractHOUR" })
  }, [])

  useEffect(() => {
    console.log("Checking for persisted page...")
    let persistedPage = sessionStorage.getItem("shouldPersistPage")

    if (persistedPage) {
      switch (persistedPage) {
        case "Dashboard":
          dispatch({ type: "setOnDashboard" })
          break
        case "Source":
          dispatch({ type: "setOnSource" })
          break
        case "About":
          dispatch({ type: "setOnAbout" })
          break
        default:
          dispatch({ type: "setOnHero" })
      }
    } else {
      dispatch({ type: "setOnHero" })
    }
  }, [])

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <StateContext.Provider value={state}>
          <DispatchContext.Provider value={dispatch}>
            <BrowserRouter>
              <Header />
              <Suspense fallback={<Fallback />}>
                <Routes>
                  <Route path="/" element={state.onPage.component} />
                  {/* <Route path="/" element={<Hero />} /> */}
                  {/* <Route path="/" element={<Dashboard provider={wagmiConfig.publicClient} />} /> */}
                  {/* <Route path="/dashboard" element={<Dashboard provider={wagmiConfig.publicClient} />} /> */}
                  {/* <Route path="/source" element={<Source />} /> */}
                  {/* <Route path="/about" element={<About />} /> */}
                </Routes>
              </Suspense>
            </BrowserRouter>
          </DispatchContext.Provider>
        </StateContext.Provider>
      </WagmiConfig>
      <Web3Modal
        themeMode="dark"
        themeVariables={{
          "--w3m-accent-color": "#2bf2cd",
          "--w3m-background-color": "#2bf2cd",
          "--w3m-accent-fill-color": "#131a2a",
          "--w3m-logo-image-url": "https://i.imgur.com/AzTQZkz.png"
        }}
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}

// replace react-reveal
// add testnet
