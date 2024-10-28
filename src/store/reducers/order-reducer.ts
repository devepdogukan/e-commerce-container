import { createSlice } from '@reduxjs/toolkit'

type OrderItem = {
  id: number
  name: string
  quantity: number
  price: number
  imageUrl: string
}

interface OrderState {
  orders: {
    orderId: string
    items: OrderItem[]
    date: string
    totalPrice: number
  }[]
}

const initialState: OrderState = {
  orders: [],
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = []
    },
    addOrder: (state, action) => {
      state.orders.unshift(action.payload)
    },
  },
})

export const actions = {
  ...orderSlice.actions,
}

export default orderSlice.reducer
