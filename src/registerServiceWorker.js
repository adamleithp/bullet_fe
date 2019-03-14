/* eslint-disable no-console */

import { register } from 'register-service-worker'

const debug = true;
const setDebugState = (state) => {
  if (debug && process.env.NODE_ENV === 'production') {
    localStorage.setItem('sw_state', state)
  }
}

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      setDebugState('ready');
    },
    registered () {
      console.log('Service worker has been registered.')
      setDebugState('registered');
    },
    cached () {
      console.log('Content has been cached for offline use.')
      setDebugState('cached');
    },
    updatefound () {
      console.log('New content is downloading.')
      setDebugState('updatefound');
    },
    updated () {
      console.log('New content is available; please refresh.')
      setDebugState('updated');
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
      setDebugState('offline');
    },
    error (error) {
      console.error('Error during service worker registration:', error)
      setDebugState('error');
    }
  })
}
