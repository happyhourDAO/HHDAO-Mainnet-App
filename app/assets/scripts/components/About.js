import React, { useState } from "react"
import Footer from "./Footer"

let arrayFAQ = [
  {
    question: "What is the purpose of the happyhourDAO?",
    answer: "The happyhourDAO aims to bridge the gap between happy-hour-goers in the real physical world and traditional F&B merchants with plebs in the metaverse through its native ERC20 token, $HOUR. For once, drinkers have the opportunity to earn from their engagement in happy hour. It shouldn't be that people have earned the right to attend happy hour from their relentless hard work they put in at the office, but rather their happy hour attendance should also be rewarded."
  },
  {
    question: "What is the tokenomics of $HOUR?",
    answer: "Based on real-time hours spent at happy hour, drinkers can earn $HOUR tokens via the Happy Hour Protocol Engine. In exchange, these earned $HOUR tokens have a multi-functional utility such as being able to use those $HOUR tokens in purchasing discounted beverages at participating bars/nightclubs. They also can allow drinkers to exchange them into other tokens of their choosing. And with the metaverse spawning nightlife entrepreneurs to take their venues digitally online, $HOUR tokens can also be used at those web3 nightlife venues."
  },
  {
    question: "What is the tokenomics of $DRNK?",
    answer: "When enough $HOUR tokens have been accumulated, drinkers can then burn them in exchange for $DRNK, which is the governance token of the happyhourDAO. The governance token of $DRNK will enable voting rights, HHIP (happy hour improvement proposals) requests and approvals, premium access to other whitelist nightlife events, and other premium benefits. The larger amount of $DRNK governance tokens owned allows for a larger percentage of influence you can have on any happyhourDAO participation."
  },
  {
    question: "Who can participate in the ecosystem?",
    answer: "From the local bar, the city's premier club, the skyline lounge, the speakeasy, the hotel restaurant, and etc. to the local dive bar goer, the fist pumping clubber, the high class fancy rooftop lounger, or the occasional casual drinker… this is the DAO for you."
  }
]

function About() {
  const [display, setDisplay] = useState(0)

  function handleChangeQA(i) {
    setDisplay(i)
  }

  return (
    <>
      <div className="container">
        <div className="hero-component-1">
          <div style={{ marginRight: "17px" }} className="hero-component-1__left-block">
            <span className="left-block__title">Who We Are</span>
            <span className="left-block__subtitle">Just a bunch of anon degens 👋 that have identified a gap between the essence of good times and web3.</span>
            <span style={{ color: "white", fontSize: "1.2rem" }} className="left-block__subtitle">
              We're just here for good times. 🍹
            </span>
            <button style={{ marginTop: "10px" }}>
              <a className="remove-default-color" href="https://twitter.com/happyhourDAO" target="_blank">
                Follow Us
              </a>
            </button>
          </div>
          <div style={{ marginLeft: "15px" }} className="hero-component-1__right-block">
            {arrayFAQ.map((QA, i) => (
              <>
                <div className={"qa-wrapper " + (display == i ? "qa-wrapper--display" : "")}>
                  <div onClick={e => handleChangeQA(i)} className={"question " + (display == i ? "question--display" : "")}>
                    <span>{QA.question}</span>
                    <span>{display == i ? "-" : "+"}</span>
                  </div>
                  <div className={display == i ? "answer--display" : "answer--hide"}>{QA.answer}</div>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default About
