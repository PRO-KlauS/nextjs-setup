import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "../reducers/index";
// import storage from "redux-persist/es/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const isDev = process.env.NODE_ENV !== "production";

const isClient = typeof window !== "undefined";

let store;
let persistor;
let initialState = {};

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const middleware = [thunkMiddleware];
const enhancer = isDev
  ? composeEnhancers(applyMiddleware(...middleware))
  : applyMiddleware(...middleware);

if (isClient) {
  const storage = require("redux-persist/lib/storage").default;
  const persistConfig = {
    key: "esg",
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);
  // To add redux devtools extension support

  store = createStore(persistedReducer, initialState, enhancer);
  persistor = persistStore(store);
} else {
  store = createStore(rootReducer, initialState, enhancer);
}

export { store, persistor };
