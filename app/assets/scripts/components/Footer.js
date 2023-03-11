import React from "react"
import { SiTwitter, SiGithub, SiDiscord, SiGitbook } from "react-icons/si"
import { IconContext } from "react-icons"

function Footer() {
  return (
    <>
      <footer>
        <div>happyhourDAO.v3.</div>
        <IconContext.Provider value={{ size: "1.2em" }}>
          <div className="social-media-icons">
            <a href="https://twitter.com/happyhourDAO" target="_blank">
              <SiTwitter className="social-media-icons__link" />
            </a>
            <a href="https://github.com/happyhourDAO" target="_blank">
              <SiGithub className="social-media-icons__link" />
            </a>
            <a href="https://discord.gg/XegjVTGmyR" target="_blank">
              <SiDiscord className="social-media-icons__link" />
            </a>
            <a href="https://happy-hour-1.gitbook.io/happyhourdao/" target="_blank">
              <SiGitbook className="social-media-icons__link" />
            </a>
            <a href="https://mirror.xyz/0x2b776aa3C2389D6a3B7b11cd99Fdb94190bAF75b" target="_blank">
              <div className="social-media-icons__mirror"></div>
            </a>
          </div>
        </IconContext.Provider>
      </footer>
    </>
  )
}

export default Footer
