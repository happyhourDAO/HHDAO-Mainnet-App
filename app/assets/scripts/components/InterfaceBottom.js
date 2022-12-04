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
      <form className={"interface__function-field interface__function-field--overflow " + (appState.functionIndex == 1 ? "" : "non-visible")}>
        <div className="input-box">
          <input type="text" required />
          <span>name</span>
        </div>
        <div className="input-box">
          <input type="text" required />
          <span>location</span>
        </div>
        <div className="input-box">
          <input type="text" required />
          <span>address</span>
        </div>
        <div className="input-box">
          <input type="text" required />
          <span>access code</span>
        </div>
        <div className="input-box">
          <button>button</button>
        </div>
      </form>

      <div className={"interface__function-title " + (appState.functionIndex == 2 ? "" : "non-visible")}>
        <p>Start $HOUR.</p>
      </div>
      <form className={"interface__function-field " + (appState.functionIndex == 2 ? "" : "non-visible")}>
        <div className="input-box">
          <input type="text" required />
          <span>ID of PDE</span>
        </div>
        <div className="input-box">
          <input type="text" required />
          <span>access code</span>
        </div>
        <div className="input-box">
          <button>button</button>
        </div>
      </form>

      <div className={"interface__function-title " + (appState.functionIndex == 3 ? "" : "non-visible")}>
        <p>End $HOUR.</p>
      </div>
      <form className={"interface__function-field " + (appState.functionIndex == 3 ? "" : "non-visible")}>
        <div className="input-box">
          <input type="text" required />
          <span>drinker address</span>
        </div>
        <div className="input-box">
          <button>button</button>
        </div>
      </form>

      <div className={"interface__function-title " + (appState.functionIndex == 4 ? "" : "non-visible")}>
        <p>Mint $DRNK.</p>
      </div>
      <form className={"interface__function-field " + (appState.functionIndex == 4 ? "" : "non-visible")}>
        <div className="input-box">
          <input type="text" required />
          <span>$DRNK contract address</span>
        </div>
        <div className="input-box">
          <input type="text" required />
          <span>to</span>
        </div>
        <div className="input-box">
          <input type="text" required />
          <span>$HOUR burn amount</span>
        </div>
        <div className="input-box">
          <button>button</button>
        </div>
      </form>
    </>
  )
}

export default InterfaceBottom
