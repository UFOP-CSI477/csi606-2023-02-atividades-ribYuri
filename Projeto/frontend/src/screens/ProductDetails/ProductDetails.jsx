import "./ProductDetails.css";

import { Card } from "../../components";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { BsStar, BsStarHalf, BsStarFill } from "react-icons/bs";
import { getProductById } from "../../services/products";

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const stars = [];

  useEffect(() => {
    getProductById(id)
      .then((res) => {
        setProduct(res);
      })
      .catch((error) => console.log(error));
  }, []);

  // Definindo as estrelas de rating
  const setStarsArray = (rate) => {
    let fullStars = Math.floor(rate);
    const decimalPart = rate - fullStars;
    let halfStar = 0;

    if (decimalPart != 0) {
      // se for 0 rate é um numero natural, logo nao possui parte decimal
      if (decimalPart > 0.89) {
        fullStars++;
      } else if (decimalPart > 0.3) {
        halfStar = 1;
      }
    }

    for (let i = 0; i < 5; i++) {
      if (fullStars > 0) {
        stars.push(1);
        fullStars--;
      } else if (halfStar) {
        stars.push(0.5);
        halfStar--;
      } else {
        stars.push(0);
      }
    }
  };

  setStarsArray(product?.rating.rate);

  return (
    <section className="product_details_container">
      {product && (
        <>
          <h1>{product.title}</h1>

          <div className="details_container">
            <Card
              className="product_card"
              titleClass="title_marginB_normal"
              imageClass="image_size_normal"
              imageUrl={product.image}
              imageAlt={product.title}
            />
            <div className="details_content">
              <div className="details_header">
                <p>Marca: {product.category} </p>
                <div className="rating">
                  <div className="stars_container">
                    <p>{product.rating.rate}</p>
                    {stars.map((value, index) =>
                      value === 1 ? (
                        <BsStarFill key={index} className="star" />
                      ) : value === 0.5 ? (
                        <BsStarHalf key={index} className="star" />
                      ) : (
                        <BsStar key={index} className="star" />
                      )
                    )}
                  </div>
                  <p>{product.rating.count} avaliações de clientes</p>
                </div>
              </div>
              <div className="descriptions">
                <p className="price">
                  R$
                  <span className="price_span"> {product.price}</span>
                </p>
                <dl>
                  <dt>Descrição do produto</dt>
                  <dd>{product.description}</dd>
                </dl>
              </div>
              <div className="details">
                <table>
                  <tbody>
                    <tr>
                      <th>Produto</th>
                      <td>{product.title}</td>
                    </tr>
                    <tr>
                      <th>Categoria</th>
                      <td>{product.category}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
