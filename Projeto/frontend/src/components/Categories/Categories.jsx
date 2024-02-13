import "./Categories.css";

import { Card, Title } from "../index";
import { BsArrowRight } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategories } from "../../services/categories";
import { getProducts } from "../../services/products";

export const Categories = () => {
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();

  const quantityItens = 3;

  useEffect(() => {
    getProducts()
      .then((res) => {
        setProducts(res);
      })
      .catch((error) => console.log(error));

    getCategories()
      .then((res) => {
        setCategories(res.slice(0, quantityItens));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="categories_container">
      <div className="categories_title">
        <Title
          className="title_component"
          title="Categories"
          description="Find what you are looking for"
        />
      </div>
      <div className="cards_container">
        {categories?.map((category, index) => {
          const product = products?.find(
            (product) => product.category === category
          );
          if (product) {
            return (
              <Link
                key={product.id}
                to={`/products/category/${product.category}`}
              >
                <Card
                  key={product.id}
                  className="categories_card categories_size"
                  imageClass="categories_image_size"
                  titleClass="card_title"
                  imageUrl={product.image}
                  imageAlt={product.title}
                  title={product.category}
                  description={index == 1 ? product.title : ""}
                />
              </Link>
            );
          }
        })}
      </div>
      <NavLink to="/products">
        <button type="button">
          Explore
          <BsArrowRight />
        </button>
      </NavLink>
    </section>
  );
};
