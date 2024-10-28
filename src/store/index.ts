import { combineReducers, configureStore } from '@reduxjs/toolkit'
import basketSlice from './reducers/basket-reducer'
import orderSlice from './reducers/order-reducer'
import productSlice from './reducers/product-reducer'
import authSlice from './reducers/auth-reducer'

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const basketPersistConfig = {
  key: 'basket',
  storage,
}

const orderPersistConfig = {
  key: 'order',
  storage,
}

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['error', 'loading'],
}

const reducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  basket: persistReducer(basketPersistConfig, basketSlice),
  order: persistReducer(orderPersistConfig, orderSlice),
  product: productSlice,
})

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
