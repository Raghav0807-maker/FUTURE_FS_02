import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params) => {
    const response = await productAPI.getAll(params);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    selectedCategory: 'All',
    searchTerm: '',
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategory, setSearchTerm } = productSlice.actions;
export default productSlice.reducer;