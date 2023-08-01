import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const reducer = (state = 0, action) =>{

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
    default: {
      return state
    }
  }
  return state
}

function App() {

  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const set = () => {
    dispatch({type:'set', payload: value})
    setValue('')
  } 

  return (
    <div>
      <p>Counter: {state}</p>
      <button onClick={() => dispatch({type:'up'})}>+</button>
      <button onClick={() => dispatch({type:'down'})}>-</button>
      <label>
        <input value={value} onChange={e => setValue(Number(e.target.value))}/>
        <button onClick={set} >Set</button>
      </label>
    </div>
  );
}

export default App;
