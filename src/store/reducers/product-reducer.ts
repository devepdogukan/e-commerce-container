import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import productService from '~/services/product-service'

export interface IProduct {
  id: number
  title: string
  description: string
  category: string
  price: number
  brand: string
  thumbnail: string
  images: string[]
}

interface ProductState {
  list: IProduct[]
  filter: string
  sort: 'asc' | 'desc' | null
  loading: boolean
  error: null | string
}

const initialState: ProductState = {
  list: [],
  filter: '',
  sort: 'asc',
  loading: false,
  error: null,
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.list = []
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload
    },
    setSort(state, action: PayloadAction<'asc' | null>) {
      state.sort = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload.products
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Unknown error'
      })
  },
})

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await productService.getAll()
    return response
  },
)

export const actions = {
  ...productSlice.actions,
  fetchProducts,
}

export default productSlice.reducer
