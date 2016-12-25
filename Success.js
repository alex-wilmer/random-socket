import React from 'react'
import ReactDOMServer from 'react-dom/server'

let Success = () =>
  <div style={container}>
    <h1 style={fontStyle}>Enjoy the show!</h1>
  </div>

let container = {
  backgroundColor: `rgb(188, 168, 195)`,
  height: `100vh`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  flexDirection: `column`,
}

let fontStyle = {
  fontFamily: `Helvetica`,
  fontWeight: 100,
}

export default
ReactDOMServer.renderToStaticMarkup(<Success />)
