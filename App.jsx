import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes
import { Provider } from "react-redux";
import Navbar from "./components/Navbar";
import productReducer from "./reducer/productSlice"; // Assuming you have a product slice
import ProductsPage from "./components/ProductsPage";
import { configureStore } from "@reduxjs/toolkit";
import Login from "./components/login.jsx";
import ProductForm from "./components/formAdd.jsx";
import ProductList from "./components/productList";
const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          {/* Use Routes instead of Switch */}
          <Route path="/" element={<ProductsPage />} />
          <Route path="login" element={<Login />} />
          <Route path="/add" element={<ProductForm />} />
          <Route path="/store" element={<ProductList />} />
        </Routes>
      </Router>
    </Provider>
  );
}
