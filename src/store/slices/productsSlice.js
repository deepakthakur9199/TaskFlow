import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  filteredItems: [],
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    categories: [],
    brands: [],
    priceRange: [0, 1000],
    rating: 0,
    inStock: false,
  },
  selectedProduct: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
      state.filteredItems = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      applyFilters(state);
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      applyFilters(state);
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
  },
});

function applyFilters(state) {
  let filtered = state.items;

  // Search query filter
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.brand.toLowerCase().includes(query)
    );
  }

  // Category filter
  if (state.filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      state.filters.categories.includes(product.category)
    );
  }

  // Brand filter
  if (state.filters.brands.length > 0) {
    filtered = filtered.filter(product =>
      state.filters.brands.includes(product.brand)
    );
  }

  // Price range filter
  filtered = filtered.filter(product =>
    product.price >= state.filters.priceRange[0] &&
    product.price <= state.filters.priceRange[1]
  );

  // Rating filter
  if (state.filters.rating > 0) {
    filtered = filtered.filter(product => product.rating >= state.filters.rating);
  }

  // In stock filter
  if (state.filters.inStock) {
    filtered = filtered.filter(product => product.inStock);
  }

  state.filteredItems = filtered;
}

export const {
  setProducts,
  setLoading,
  setError,
  setSearchQuery,
  setFilters,
  setSelectedProduct,
} = productsSlice.actions;

export default productsSlice.reducer;