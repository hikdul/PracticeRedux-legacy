import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const initialState = {
  entities: [],
  filter: 'all'// complete, incomplete
}
// ** un todo debe de completar los siguientes datos {Id: number, title: string, completed: bool}

// ! evitar la mutabilidad en reducer, siempo devolver una nueva copia del elemento o del estado... esto motivado a que reducer no re-renderizan si no es un estado nuevo
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'todo/add':{
      return{
        ...state,
        entities: state.entities.concat({...action.payload })
      }
    }
    case 'todo/complete': {
      const newTodos = state.entities.map(todo => {
        if(todo.id === action.payload.id)
          return {...todo, completed: !todo.completed }
        return todo
      })
     return {
      ...state,
      entities: newTodos
     }
    }
    case 'filte/set': {
      return {
        ...state,
        filter: action.payload
      }
    }
    default:{
      return state
    }
  }
}

const selectTodos = state =>{
  const{entities, filter} = state
  
  if(filter == 'complete')
    return entities.filter(todo => todo.completed)
  if(filter == 'incomplete')
    return entities.filter(todo => !todo.completed)
  return entities
}

const TodoItem = ({todo}) => 
{
  const dispatch = useDispatch()
  return(
    <li
      style={{textDecoration: todo.completed ? 'line-through' : 'none'}}
      onClick={()=> dispatch({type:'todo/complete', payload:todo})}
    > <b>{todo.id}:</b> {todo.title} </li>
  )
}

const App = () =>
{

  const [value, setValue] = useState('')
  const dispatch = useDispatch()
  //  ** --> // la idea en la siguiente linea es que obtiene el estado completo.
  //  ** --> // const state = useSelector(x => x)
  // ** --> // en la siguiente linea hacemos uso del hock que es la idea de este
  //const state = useSelector(selectTodos)
  const todos = useSelector(selectTodos)
  
  const submit = e => {

    e.preventDefault()

    if(!value.trim())
      return

    const Id = Math.random().toString(36).substring( 3,13)
    //const todo = {title: value, completed: false, id: Id}
    //console.log({todo})
    dispatch({ type: 'todo/add', payload: {title: value, completed: false, id: Id}})
    setValue('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={value} onChange={e => setValue(e.target.value)}/>
        <button type='submit' >+</button>
      </form>
      <button onClick={() => dispatch({type:'filter/set', payload:'all'})} > all </button>
      <button onClick={() => dispatch({type:'filter/set', payload:'complete'})}> complete </button>
      <button onClick={() => dispatch({type:'filter/set', payload:'incomplete'})}> incomplete </button>
      <ul>
        {todos.map( todo => <TodoItem key={todo.id} todo={todo}/> )}
      </ul>
    </div>
  )
}

export default App