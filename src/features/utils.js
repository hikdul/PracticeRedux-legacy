
// -- este elemento no lo entendi bien.. investigar sobre el ...
export const reduceReducers = (...reducers) => (state, action) => reducers.reduce((acc,el) => el(acc, action), state)

const initialFetchingReducer = { loading: 'idle', error: null }

 // -- higer order reducer
export const makefetchingReducer = actions => ( state = initialFetchingReducer, action ) => 
{
  
  switch (action.type) {
    case actions[0]:
    {
      return { ...state, loading: 'pending'}
    }     
    case actions[1]:
    {
      return { ...state, loading: 'succeded'}
    }
    case actions[2]:
    {
      return { error: action.error, loading: 'rejected'}
    }
    default:
    {
     return {...state, loading: 'idle'}
    }
  }
}



export const makeSetReducer = actions => (state = 'all', action) =>
{
  switch (action.type) {
    case actions[0]: {
      return action.payload
    }
    default:
      return state;
  }
}

export const makeCrudReducer = actions => (state = [], action) =>
{
  switch (action.type) {
    case actions[0]:{
      return state.concat({...action.payload })
    }
    case actions[1]: {
      const newEnt = state.map(ent => {
        if(ent.id === action.payload.id)
          return {...ent, completed: !ent.completed }
        return ent
      })
     return newEnt
    }
    default:
      return state
  }
}

// -- Make action creator = mac
export const mac = (type , ...argNames) => 
  (...args) =>
    {
        const action = { type }
        argNames.forEach((arg, index) =>
        {
          action[argNames[index]] = args[index]  
        })
        return action
    }