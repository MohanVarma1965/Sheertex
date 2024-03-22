import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../models/product";

interface FilterCriteria {
  availableForSale: boolean;
  searchQuery: string;
  sizes: string[];
  colors: string[];
}

interface ProductsState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: FilterCriteria;
  sortCriteria: string;
  sortOrder: string;
}

const initialState: ProductsState = {
  products: [],
  status: "idle",
  error: null,
  filters: {
    availableForSale: false,
    searchQuery: "",
    sizes: [],
    colors: [],
  },
  sortCriteria: "name",
  sortOrder: "ascending",
};

// Async thunk to fetch products from the mock API (public folder)
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("/products.json");
  const data = await response.json();
  return data;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // Action to set the search query
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.searchQuery = action.payload;
    },
    // Action to set the availability filter
    setAvailableForSaleFilter(state, action: PayloadAction<boolean>) {
      state.filters.availableForSale = action.payload;
    },
    setSortCriteria(state, action: PayloadAction<{ criteria: string; order: string }>) {
      state.sortCriteria = action.payload.criteria;
      state.sortOrder = action.payload.order;
    },
    addSizeFilter(state, action: PayloadAction<string>) {
      state.filters.sizes.push(action.payload);
    },
    removeSizeFilter(state, action: PayloadAction<string>) {
      state.filters.sizes = state.filters.colors.filter((color) => color !== action.payload);
    },
    addColorFilter(state, action: PayloadAction<string>) {
      if (!state.filters.colors.includes(action.payload)) {
        state.filters.colors.push(action.payload);
      }
    },
    removeColorFilter(state, action: PayloadAction<string>) {
      state.filters.colors = state.filters.colors.filter((color) => color !== action.payload);
    },
    clearAllFilters: (state) => {
      state.filters = initialState.filters;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const {
  setSearchQuery,
  setAvailableForSaleFilter,
  setSortCriteria,
  addSizeFilter,
  removeSizeFilter,
  addColorFilter,
  removeColorFilter,
  clearAllFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
