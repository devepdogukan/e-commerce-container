import { createSlice } from '@reduxjs/toolkit'

type Basket = {
  quantity: number
  id: number
}

interface BasketState {
  list: Basket[]
}

const initialState: BasketState = {
  list: [],
}

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    clearBasket: (state) => {
      state.list = []
    },
    decreaseBasket: (state, action) => {
      const id = action.payload
      const findedItem = state.list.find((item) => item.id === id)
      if (!findedItem) return
      const basketIndex = state.list.findIndex((item) => item.id === id)

      if (basketIndex < 0) return
      const activeItem = state.list[basketIndex]

      if (activeItem.quantity > 1) {
        activeItem.quantity -= 1
        return
      }

      state.list.splice(basketIndex, 1)
    },
    addBasket: (state, action) => {
      const { id } = action.payload
      const basketIndex = state.list.findIndex((item) => item.id === id)

      if (basketIndex < 0) {
        state.list = [...state.list, { id, quantity: 1 }]
      } else {
        state.list[basketIndex].quantity += 1
      }
    },
  },
})

export const actions = {
  ...basketSlice.actions,
}

export default basketSlice.reducer
