
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './root';
import createSagaMiddleware from 'redux-saga';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [
    'items',
    'cart',
    'modal',
    'orderSummary',
    'status',
    'order_details',
    'order_table_status',
    'language'
  ],
  // whitelist: ['language'],
};

let sagaMiddleware = createSagaMiddleware();


const persistedReducer = persistReducer(persistConfig, rootReducer);


let store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ thunk: true, serializableCheck: false }).concat(sagaMiddleware),
});


let persistor = persistStore(store);

export { store, persistor };

