import "./Showcase.css";

import { Title } from "../index";
import { BsArrowRight } from "react-icons/bs";
import { Card } from "../index";
import { useEffect, useState } from "react";
import { getProductsOrderBy } from "../../services/products";
import { Link, NavLink } from "react-router-dom";

export const Showcase = () => {
  const [products, setProducts] = useState();
  const quantityItens = 3;

  useEffect(() => {
    getProductsOrderBy("rate", "desc")
      .then((res) => {
        setProducts(res.slice(0, quantityItens));
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="container_show">
      <div className="description_container">
        <Title
          className="showcase_title"
          title="Best Selling Products"
          description="Easiest way to healthy life by buying our products "
        />
        <NavLink to="/products">
          <button type="button" className="showMore_button">
            See more
            <BsArrowRight />
          </button>
        </NavLink>
      </div>

      <div className="card_container">
        {products?.map((product) => (
          <Link key={product.id} to={`/products/${product.id}`}>
            <Card
              key={product.id}
              className="showcase_card small_size"
              titleClass="title_marginB_normal"
              imageClass="image_size_small"
              imageUrl={product.image}
              imageAlt={product.title}
              title={product.title}
              description={`R$ ${product.price}`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
