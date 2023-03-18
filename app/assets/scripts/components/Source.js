import React, { useContext } from "react"
import Footer from "./Footer"
import StateContext from "../StateContext"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { duotoneSea } from "react-syntax-highlighter/dist/esm/styles/prism"

let codeString = `function startHOUR(uint _PDEid, uint _accessCode) public payable {

  bool validPDE = false;

  for (uint i = 0; i < pdes.length; i++) {
      if (pdes[i]._PDEid == _PDEid && pdes[i]._accessCode == _accessCode) {
          validPDE = true;
      }
  }

  require(validPDE == true);
  require(msg.value == happyHourFee * (10 ** 16), "Invalid Happy Hour Fee.");
  givePoolDrinkingId();
  drinkingIDtoPDEid[drinkingID[msg.sender]] = _PDEid;
  happyHourFeePool += 1;
  timeIN = block.timestamp;
}`

function Source() {
  const appState = useContext(StateContext)

  return (
    <>
      <div className="container">
        <div className="hero-component-1">
          <div style={{ marginRight: "17px" }} className="hero-component-1__left-block">
            <span className="left-block__title">Open-Sourced</span>
            <span className="left-block__subtitle">
              The Happy Hour Protocol Engine consists of 2 smart contracts 📖, including{" "}
              <a href={"https://etherscan.io/address/0x3807dab03e8519f0f4f4c37568e27a71b138d47b"} target="_blank" className="code code__source-link">
                ./HappyHourProtocolv3
              </a>{" "}
              &{" "}
              <a href={"https://etherscan.io/address/" + appState.DRNKnetwork.contractAddress} target="_blank" className="code code__source-link">
                ./DRNKgovernance
              </a>
              . Feel free to make a pull request for any suggestions!
            </span>
            <span style={{ color: "white", fontSize: "1.2rem" }} className="left-block__subtitle">
              Don't trust. 🔍 Verify.
            </span>
            <a style={{ textDecoration: "none", width: "50%" }} href="https://github.com/happyhourDAO" target="_blank">
              <button style={{ marginTop: "10px" }}>Our Github</button>
            </a>
          </div>
          <div className="hero-component-1__right-block">
            <SyntaxHighlighter language="solidity" style={duotoneSea} showLineNumbers={true} customStyle={{ borderRadius: "7px" }}>
              {codeString}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Source
