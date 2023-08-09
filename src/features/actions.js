
import { mac } from "./utils"

// -- modo antiguo
// * // export const setPending = () => ({ type: 'todos/pending'})
// * // export const setFullFilled = todos => ({type: 'todos/fullfilled', payload: todos} )
// * // export const setError = e => ({type: 'todos/error', error: e.message})
// * // export const setComplete = todo => ({ type:'todo/complete', payload: todo })
// * // export const setAddTodo = todo => ({ type: 'todo/add', payload: {...todo} })
// * // export const setFilter = payload => ({type:'filter/set', payload})

// -- modo mas simplificado y mejor para reutilsisar
export const setPending    = mac('todos/pending')
export const setFullFilled = mac('todos/fullfilled', 'payload') 
export const setError      = mac( 'todos/error', 'error')
export const setComplete   = mac('todo/complete', 'payload')
export const setAddTodo    = mac('todo/add','payload')
export const setFilter     = mac('filter/set','payload')

