import { setError, setFullFilled, setPending } from "./actions"

export const fetchThunk = () => async dispatch => {
  dispatch(setPending)
  try
  {
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos') 
    const data = await resp.json()
    const todos = data.slice(10,25)
    dispatch(setFullFilled(todos))
  }
  catch (e) 
  {
    dispatch(setError(e.message))
  }
}