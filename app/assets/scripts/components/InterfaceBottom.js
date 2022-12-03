import React, { useEffect, useContext } from "react"
import DispatchContext from "../DispatchContext"
import StateContext from "../StateContext"

function InterfaceBottom() {
  const appDispatch = useContext(DispatchContext)
  const appState = useContext(StateContext)

  return (
    <>
      <div className={"interface__function-title " + (appState.functionIndex == 1 ? "" : "non-visible")}>
        <p>Onboard PDE.</p>
      </div>
      <div className={"interface__function-field " + (appState.functionIndex == 1 ? "" : "non-visible")}>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="location" />
        <input type="text" placeholder="address" />
        <input type="text" placeholder="access code" />
      </div>

      <div className={"interface__function-title " + (appState.functionIndex == 2 ? "" : "non-visible")}>
        <p>Start $HOUR.</p>
      </div>
      <div className={"interface__function-field " + (appState.functionIndex == 2 ? "" : "non-visible")}>
        <input type="text" placeholder="ID of PDE" />
        <input type="text" placeholder="access code" />
      </div>

      <div className={"interface__function-title " + (appState.functionIndex == 3 ? "" : "non-visible")}>
        <p>End $HOUR.</p>
      </div>
      <div className={"interface__function-field " + (appState.functionIndex == 3 ? "" : "non-visible")}>
        <input type="text" placeholder="drinker address" />
      </div>

      <div className={"interface__function-title " + (appState.functionIndex == 4 ? "" : "non-visible")}>
        <p>Mint $DRNK.</p>
      </div>
      <div className={"interface__function-field " + (appState.functionIndex == 4 ? "" : "non-visible")}>
        <input type="text" placeholder="$DRNK contract address" />
        <input type="text" placeholder="to" />
        <input type="text" placeholder="burn amount" />
      </div>
    </>
  )
}

export default InterfaceBottom
