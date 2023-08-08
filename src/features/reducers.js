
import { combineReducers } from "redux"

const filterReducer = (state = 'all', action) =>
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

 const fetchingReducer = ( state = initialFetchingReducer, action ) => 
{
  
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

const todosReducer = (state = [], action) =>
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