import React, { useEffect, useContext } from "react"
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
      <div className={"interface__function-description " + (appState.functionIndex == 1 ? "" : "non-visible")}>Onboard your bar/club/restaurant as a Participating Drinking Establishment in the happyhourDAO network. Earn 10% of all earned $HOUR from Drinkers and be eligible for social $DRNK funding.</div>
      <div className={"interface__function-description " + (appState.functionIndex == 2 ? "" : "non-visible")}>Start your happy hour session and start earning $HOUR. Minimum deposit of 0.01 ETH required during session. Deposit will be returned upon end of session.</div>
      <div className={"interface__function-description " + (appState.functionIndex == 3 ? "" : "non-visible")}>Wrap up your current happy hour session to receive earned $HOUR and initial 0.01 ETH deposit.</div>
      <div className={"interface__function-description " + (appState.functionIndex == 4 ? "" : "non-visible")}>Burn your earned $HOUR to mint the $DRNK governance token.</div>
    </>
  )
}

export default InterfaceTop
