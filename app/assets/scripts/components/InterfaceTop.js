import React, { useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function InterfaceTop() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  return (
    <>
      <div className="interface__function-nav">
        <nav>
          <li onClick={() => appDispatch({ type: "changeFunctionIndex", value: 1 })} className={appState.functionIndex == 1 ? "active-tab" : ""}>
            PDE
          </li>
          <li onClick={() => appDispatch({ type: "changeFunctionIndex", value: 2 })} className={appState.functionIndex == 2 ? "active-tab" : ""}>
            START
          </li>
          <li onClick={() => appDispatch({ type: "changeFunctionIndex", value: 3 })} className={appState.functionIndex == 3 ? "active-tab" : ""}>
            END
          </li>
          <li onClick={() => appDispatch({ type: "changeFunctionIndex", value: 4 })} className={appState.functionIndex == 4 ? "active-tab" : ""}>
            $DRNK
          </li>
        </nav>
      </div>
      <div className={"interface__function-description " + (appState.functionIndex == 1 ? "" : "non-visible")}>Onboard your F&B establishment as a Participating Drinking Establishment &#40;PDE&#41; in the happyhourDAO network. Earn {Number(appState.HOURnetwork.PDEcommission).toLocaleString(undefined, { style: "percent", minimumFractionDigits: 0 })} of all earned $HOUR from LITT sessions and be eligible for social $DRNK investments. Your access code can be any arbitary number.</div>
      <div className={"interface__function-description " + (appState.functionIndex == 2 ? "" : "non-visible")}>Start your LITT session and start earning $HOUR at happy hour. Stake minimum of 0.01 ETH required during session. Staked ETH will be returned upon end of session. Start by inputting a valid PDE ID and access code combination.</div>
      <div className={"interface__function-description " + (appState.functionIndex == 3 ? "" : "non-visible")}>End your LITT session to receive earned $HOUR and get your initial 0.01 ETH staked deposit returned. LITT sessions must be ended before 8 hours in order to receive the standard $HOUR/hour rate.</div>
      <div className={"interface__function-description " + (appState.functionIndex == 4 ? "" : "non-visible")}>Burn your $HOUR to mint the $DRNK governance token. The governance token of $DRNK will enable voting rights, HHIP &#40;happy hour improvement proposals&#41; requests and approvals, premium access to other whitelist nightlife events, and other exclusive benefits.</div>
    </>
  )
}

export default InterfaceTop
