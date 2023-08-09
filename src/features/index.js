import {setPending, setFullFilled, setError, setComplete, setAddTodo, setFilter } from './actions'
import { selectTodos, selectStatus } from './selectors';
import { fetchThunk } from './fethThunk'
import { reducer } from "./reducers";
import { makeCrudReducer, makeSetReducer, makefetchingReducer, mac } from './utils';

export {
        fetchThunk,
        mac,
        makeCrudReducer,
        makefetchingReducer,
        makeSetReducer,
        reducer,
        selectStatus,
        selectTodos,
        setAddTodo,
        setComplete,
        setError,
        setFilter ,
        setFullFilled,
        setPending,
    }