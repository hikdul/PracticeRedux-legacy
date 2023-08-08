import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './App' // ! esto no es una buena practica.. solo es para entender!!
import {asyncMiddleware} from './middlewares/async'
import { reducer } from './features'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))

const store = createStore(reducer, applyMiddleware(asyncMiddleware))  // ! esto no es una buena practica.. solo es para entender!!


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
