import { useState } from 'react'
import { combineReducers } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

// ** use de middlewares
export const asyncMiddleware = store => next => action =>
{
  if(typeof action === 'function')
    return action(store.dispatch, store.getState)
  next(action)
}

export const fetchThunk = () => async dispatch => {
  dispatch({ type: 'todos/pending'})
  try
  {
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos') 
    const data = await resp.json()
    const todos = data.slice(10,25)
    dispatch({type: 'todos/fullfilled', payload: todos})
  }
  catch (e) 
  {
    dispatch({type: 'todos/error', error: e.message})
  }
}

export const filterReducer = (state = 'all', action) =>
{
  switch (action.type) {
    case 'filter/set': {
      return action.payload
    }
  
    default:
      return state;
  }
}

const initialFetchingReducer = { loading: 'idle', error: null }

export const fetchingReducer = ( state = initialFetchingReducer, action ) => {
  
  switch (action.type) {
    case 'todos/pending':
    {
      return { ...state, loading: 'pending'}
    }     
    case 'todos/fullfilled':
    {
      return { ...state, loading: 'succeded'}
    }
    case 'todos/error':
    {
      return { error: action.error, loading: 'rejected'}
    }
    default:
    {
     return {...state, loading: 'idle'}
    }
  }
}

export const todosReducer = (state = [], action) =>
{

  switch (action.type) {
    case 'todos/fullfilled':{
      return action.payload
    }
    case 'todo/add':{
      return state.concat({...action.payload })
    }
    case 'todo/complete': {
      const newTodos = state.map(todo => {
        if(todo.id === action.payload.id)
          return {...todo, completed: !todo.completed }
        return todo
      })
     return newTodos
    }
    default:
      return state;
  }
}

export const reducer =  combineReducers({
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
})


const selectTodos = state =>{
  const{todos: {entities}, filter} = state
  
  if(filter === 'complete')
    return entities.filter(todo => todo.completed)
  if(filter === 'incomplete')
    return entities.filter(todo => !todo.completed)
  return entities
}

const selectStatus = state =>  state.todos.status

const TodoItem = ({todo}) => 
{
  const dispatch = useDispatch()
  return(
    <li
      style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
      onClick={()=> dispatch({ type:'todo/complete', payload:todo })}
    >
       <b>{todo.id}:</b> {todo.title} 
    </li>
  )
}

const App = () =>
{

  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  const todos = useSelector(selectTodos)
  const status = useSelector(selectStatus)
  
  const submit = e => {

    e.preventDefault()

    if(!value.trim())
      return

    const Id = Math.random().toString(36).substring( 3,13)
    const todo = {title: value, completed: false, id: Id}
    dispatch({ type: 'todo/add', payload: {...todo} })
    setValue('')
  }

  if(status.loading === 'pending')
    return <p>Loading...</p>
  if(status.loading === 'rejected')
    return <p><b>Error: </b>{status.error}</p>

  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setValue(e.target.value)}/>
        <button type='submit' >+</button>
      </form>
      <button onClick={() => dispatch({type:'filter/set', payload:'all'})} > all </button>
      <button onClick={() => dispatch({type:'filter/set', payload:'complete'})}> complete </button>
      <button onClick={() => dispatch({type:'filter/set', payload:'incomplete'})}> incomplete </button>
      <button onClick={() => dispatch(fetchThunk())}> Fetch </button>
      <ul>
        {todos.map( todo => <TodoItem key={todo.id} todo={todo}/> )}
      </ul>
    </div>
  )
}

export default App