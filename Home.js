import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { authUrl } from './config'

let Home = () =>
  <div style={container}>
    <h1 style={fontStyle}>Welcome My Love</h1>
    <a style={linkStyle} href={authUrl}>
      Click here to start the show.
    </a>
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

let linkStyle = {
  ...fontStyle,
  textDecoration: `none`,
  color: `#a20a0a`,
}

export default
ReactDOMServer.renderToStaticMarkup(<Home />)
