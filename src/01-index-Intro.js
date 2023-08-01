import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import App from './App'
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById('root'))
const store = createStore((state = 0, action) => { // es un reducer
  // action = {type: 'tipo de accion', payload: any}

  console.log({state, action})

  switch (action.type) {
    case 'up':{
      return state + 1
    }
    case 'down':{
      return state - 1
    }
    case 'set':{
      return action.payload
    }
    default:
      return state
  }
})

// obtengo un store
//console.log({store}) 
// me retorna el estado completo de mi app
//console.log(store.getState()) 

console.log(store.getState())
store.dispatch({type: 'action'}) // cada ves que se llame el dispatch del store, la funcio de reducer se vuelve a ejecutar!!
console.log(store.getState())
store.dispatch({type: 'up'}) // cada ves que se llame el dispatch del store, la funcio de reducer se vuelve a ejecutar!!
console.log(store.getState())
store.dispatch({type: 'up'})
console.log(store.getState())
store.dispatch({type: 'up'})
console.log(store.getState())
store.dispatch({type: 'set', payload: -6})
console.log(store.getState())

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
