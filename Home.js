import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { authUrl } from './config'
import Lite from './Lite'

let Home = () =>
  <div style={container}>
    <Lite />
    <h1 style={fontStyle}>Welcome, My Love</h1>
    <a style={linkStyle} href={authUrl}>
      Click here to activate your personal InstaLite!
    </a>
  </div>

let container = {
  backgroundColor: `rgb(127, 18, 134)`,
  height: `100vh`,
  display: `flex`,
  justifyContent: `center`,
  alignItems: `center`,
  flexDirection: `column`,
}

let fontStyle = {
  fontFamily: `Helvetica`,
  fontWeight: 100,
  color: `white`,
}

let linkStyle = {
  ...fontStyle,
  textDecoration: `none`,
  color: `#fed801`,
  fontWeight: `bold`,
}

export default
ReactDOMServer.renderToStaticMarkup(<Home />)
