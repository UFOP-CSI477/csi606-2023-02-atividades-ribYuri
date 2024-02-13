import "./Products.css";

import { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { Card } from "../../components/index";
import { getProducts, searchProducts } from "../../services/products";
import {
  getCategories,
  getProductsByCategory,
} from "../../services/categories";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(
    category ? category : ""
  );

  const navigate = useNavigate();

  const callGetProducts = () => {
    getProducts()
      .then((respose) => {
        setProducts(respose);
      })
      .catch((error) => console.log(error));

    navigate("/products", { replace: true });
  };

  const callGetProductsByCategory = (category) => {
    getProductsByCategory(category)
      .then((response) => setProducts(response))
      .catch((error) => console.log(error));

    navigate(`/products/category/${category}`, { replace: true });
  };

  const searchProductService = (query) => {
    searchProducts(query)
      .then((response) => setProducts(response))
      .catch((error) => console.log(error));

    navigate(`/products/search/?query=${query}`, { replace: true });
  };

  const searchInProductsByCategory = () => {
    getProductsByCategory(category)
      .then((response) =>
        setProducts(
          response.filter((product) =>
            product.title.toLowerCase().includes(query)
          )
        )
      )
      .catch((error) => console.log(error));

    navigate(`/products/category/${activeCategory}/search/?query=${query}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (activeCategory) {
      query
        ? searchInProductsByCategory(query)
        : callGetProductsByCategory(activeCategory);
      return;
    }

    if (query) {
      searchProductService(query);
    } else {
      navigate("/products", { replace: true });
      callGetProducts();
    }
  };

  const handleSelectSubmit = (e) => {
    const category = e.target.value;
    if (category === "") {
      callGetProducts();
      setActiveCategory("");
      return;
    }
    e.preventDefault();
    callGetProductsByCategory(category);
    setActiveCategory(category);
  };

  useEffect(() => {
    activeCategory
      ? callGetProductsByCategory(activeCategory)
      : callGetProducts();

    getCategories()
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="products_container">
      <div className="search_bars">
        <div className="forms_container">
          <form id="searching_product" action="/" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Looking for a product?"
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            <button type="submit">
              <BsSearch />
            </button>
          </form>
          <form id="select_category" action="/" className="select_form">
            <select
              className="select_categories"
              name="select_categories"
              id="select_categories"
              value={activeCategory}
              onChange={handleSelectSubmit}
            >
              <option value="">Select a category</option>
              {categories?.map((categorie, idx) => (
                <option key={idx} value={categorie}>
                  {categorie}
                </option>
              ))}
            </select>
          </form>
        </div>
      </div>
      <div className="product_content_container">
        <h1>Products List</h1>
        <div className="products_cards_container">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`}>
              <Card
                key={product.id}
                className="product_card"
                titleClass="title_marginB_normal"
                imageClass="image_size_normal"
                imageUrl={product.image}
                imageAlt={product.title}
                title={product.title}
                description={`R$ ${product.price}`}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
