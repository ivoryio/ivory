import React from 'react'
import ReactDOM from 'react-dom'
import { Amplify } from '@aws-amplify/core'

import { Root } from 'app/Root'
import awsConfig from './aws-exports'
import * as serviceWorker from './serviceWorker'
import { initializeTranslations } from 'locales/i18n'

if (process.env.NODE_ENV === 'development') {
  Amplify.Logger.LOG_LEVEL = 'DEBUG'
}

Amplify.configure({
  ...awsConfig,
  oauth: {
    ...awsConfig.oauth,
    // ...getRedirectUrls(),
  },
})

initializeTranslations()

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

// function getRedirectUrls() {
//   const { host } = window.location
//   const byHost = (url: string) => new URL(url).host === host

//   const redirectSignInOptions = awsConfig.oauth.redirectSignIn.split(',')
//   const redirect = redirectSignInOptions.find(byHost)

//   return {
//     redirectSignIn: redirect,
//     redirectSignOut: redirect,
//   }
// }
