import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk for fetching products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get("http://localhost:5002/products");
    return response.data;
  }
);

// Thunk for adding a product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const response = await axios.post(
      "http://localhost:5002/products",
      product
    );
    return response.data; // Make sure the API returns the new product
  }
);

// Thunk for deleting a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:5002/products/${id}`);
    return id;
  }
);

// Thunk for updating a product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    const response = await axios.put(
      `http://localhost:5002/products/${product.id}`,
      product
    );
    return response.data;
  }
);

// // Thunk for adding a comment
// export const addComment = createAsyncThunk('products/addComment', async ({ productId, comment }) => {
//   const response = await axios.post(`http://localhost:5001/products/${productId}/comments`, { comment });
//   return { productId, comment: response.data };
// });

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      });
    //   .addCase(addComment.fulfilled, (state, action) => {
    //     const { productId, comment } = action.payload;

    //     state.comments[productId].push(comment);
    //   });
  },
});

export default productSlice.reducer;
