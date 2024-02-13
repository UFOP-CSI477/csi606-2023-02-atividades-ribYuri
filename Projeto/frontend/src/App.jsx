import "./App.css";
import { Footer, Header } from "./components";
import { Home, Products, ProductDetails, Contacts, RegisterProduct } from "./screens";
import { ScrollToTop } from "./components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/category/:category" element={<Products />} />
          <Route
            path="/products/category/:category/search/?"
            element={<Products />}
          />
          <Route path="/products/search/?" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/register" element={<RegisterProduct />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
