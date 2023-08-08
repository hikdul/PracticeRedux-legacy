
export const setPending = () => ({ type: 'todos/pending'})
export const setFullFilled = todos => ({type: 'todos/fullfilled', payload: todos} )
export const setError = e => ({type: 'todos/error', error: e.message})
export const setComplete = todo => ({ type:'todo/complete', payload: todo })
export const setAddTodo = todo => ({ type: 'todo/add', payload: {...todo} })
export const setFilter = payload => ({type:'filter/set', payload})