
import { combineReducers } from "redux"
import { makeCrudReducer, makefetchingReducer, makeSetReducer, reduceReducers } from "./utils";

export const filterReducer = makeSetReducer(['filter/set'])

const fetchingReducer = makefetchingReducer([
    'todos/pending',
    'todos/filfilled',
    'todos/rejected'
])

const fullfilledReducer = makeSetReducer(['todos/fullfilled'])

const provReducer = makeCrudReducer(['todo/add','todo/complete'])

const todosReducer = reduceReducers(provReducer, fullfilledReducer)

export const reducer =  combineReducers({
  todos: combineReducers({
    entities: todosReducer,
    status: fetchingReducer,
  }),
  filter: filterReducer,
})