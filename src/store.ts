import {
  connectRouter,
  routerActions,
  routerMiddleware,
} from "connected-react-router"
import { createBrowserHistory } from "history"
import { applyMiddleware, combineReducers, compose, createStore } from "redux"
import createSagaMiddleware from "redux-saga"
import { ActionType } from "typesafe-actions"
import { authActions, authReducer, authSagas } from "./modules/auth/duck"

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}

const initialState = undefined

export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

export const rootReducer = combineReducers({
  router: connectRouter(history),
  auth: authReducer,
})

export const composeEnhancers =
  (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
)

sagaMiddleware.run(authSagas)

export type rootAction =
  | ActionType<typeof routerActions>
  | ActionType<typeof authActions>
