import React from "react"
// import { QrReader } from "react-qr-reader"
import { useZxing } from "react-zxing"

function QRreaderPopup(props) {
  // async function handleScannedResult(result, error) {
  //   if (result) {
  //     props.setPDEid(result?.text)
  //     props.setScannedValue(result?.text)
  //     props.setOpenQRreader(!props.openQRreader)
  //   }

  //   if (error) {
  //     console.error(error)
  //     // props.setOpenQRreader(!props.openQRreader)
  //   }
  // }

  const { ref } = useZxing({
    onResult(result) {
      props.setPDEid(result.getText())
      props.setScannedValue(result.getText())
      props.setOpenQRreader(!props.openQRreader)
    }
  })

  return (
    <>
      <div className="qr-code__wrapper__reader-container">
        <div className="dots-loading">
          <div></div>
        </div>

        <video ref={ref} className="qr-code-reader" />

        {/* <QrReader onResult={(result, error) => handleScannedResult(result, error)} className="qr-code-reader" /> */}
      </div>
    </>
  )
}

export default QRreaderPopup
