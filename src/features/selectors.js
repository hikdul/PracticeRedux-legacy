
export const selectTodos = state =>
{
  const{todos: {entities}, filter} = state
  
  if(filter === 'complete')
    return entities.filter(todo => todo.completed)
  if(filter === 'incomplete')
    return entities.filter(todo => !todo.completed)
  return entities
}

export const selectStatus = state =>  state.todos.status