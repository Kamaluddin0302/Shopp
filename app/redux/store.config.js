import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistStore, persistReducer} from 'redux-persist';
import CommonReducer from "./reducer/common.reducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['language']
};

const CombineReducer = combineReducers({
  common: CommonReducer,
});

const persistedReducer = persistReducer(persistConfig, CombineReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export { store, persistor };
