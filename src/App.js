import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {fetchThunk, setComplete, setAddTodo, setFilter, selectTodos, selectStatus } from './features'

const TodoItem = ({todo}) => 
{
  const dispatch = useDispatch()
  return(
    <li
      style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
      onClick={()=> dispatch(setComplete(todo))}
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
    dispatch(setAddTodo(todo))
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
      <button onClick={() => dispatch(setFilter('all'))} > all </button>
      <button onClick={() => dispatch(setFilter('complete'))}> complete </button>
      <button onClick={() => dispatch(setFilter('incomplete'))}> incomplete </button>
      <button onClick={() => dispatch(fetchThunk())}> Fetch </button>
      <ul>
        {todos.map( todo => <TodoItem key={todo.id} todo={todo}/> )}
      </ul>
    </div>
  )
}

export default App