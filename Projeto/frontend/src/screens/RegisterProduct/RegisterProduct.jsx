import "./RegisterProducts.css";
import { useState, useEffect } from "react";
import TextInput from "../../components/Input";
import { getAllCategoriesIds } from "../../services/categories";
import { postNewProduct } from "../../services/products";
import { NavLink } from "react-router-dom";

export const RegisterProduct = () => {
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    description: "",
    category: {},
    image: "",
    rate: 0,
    count: 0,
  });

  const handleInputChange = (value, key) => {
    if (key === "price") {
      setProduct((prevData) => ({
        ...prevData,
        [key]: Number(value),
      }));
    } else {
      setProduct((prevData) => ({
        ...prevData,
        [key]: value,
      }));
    }
  };

  const clearFields = () => {
    setProduct((prevData) => ({
      ...prevData,
      title: "",
      price: 0,
      description: "",
      image: "",
    }));
  };

  const setCategoryOnProduct = (category) => {
    setProduct((prevData) => ({
      ...prevData,
      category,
    }));
  };

  const handleSelectCategory = (e) => {
    const categorySelected = categories.find(
      (category) => category.id == e.target.value
    );
    setSelectedCategory(categorySelected);
    setCategoryOnProduct(categorySelected);
  };

  const saveNewProduct = (newItem) => {
    console.log(newItem);
    postNewProduct(
      newItem.title,
      newItem.price,
      newItem.description,
      newItem.category.id,
      newItem.image,
      newItem.rate,
      newItem.count
    )
      .then(() => {
        console.log("Product registered with success!");
        alert("Product registered!");
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveNewProduct(product);
    clearFields();
  };

  useEffect(() => {
    getAllCategoriesIds()
      .then((response) => {
        setCategories(response);
        setSelectedCategory(response[0]);
        setCategoryOnProduct(response[0]);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="register_product_container">
      <h1>Register new product</h1>
      <div className="register_forms">
        <form id="addNewProduct" onSubmit={handleSubmit}>
          <TextInput
            required={true}
            divClassName={"formsItem"}
            label={"Title"}
            value={product.title}
            onChange={(e) => handleInputChange(e.target.value, "title")}
          />
          <TextInput
            required={true}
            divClassName={"formsItem"}
            label={"Description"}
            value={product.description}
            onChange={(e) => handleInputChange(e.target.value, "description")}
          />
          <div className="select_and_itemPrice">
            <div className="selectContainer">
              <p>Category</p>
              <select
                className="select_categories"
                name="select_categories"
                id="select_categories"
                value={selectedCategory?.id}
                onChange={handleSelectCategory}
              >
                {categories?.map((category, idx) => (
                  <option key={idx} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <TextInput
              required={true}
              divClassName={"formsItem itemPrice"}
              label={"Price"}
              type="number"
              value={product.price}
              onChange={(e) => handleInputChange(e.target.value, "price")}
            />
          </div>
          <TextInput
            required={true}
            divClassName={"formsItem"}
            label={"Image URL"}
            value={product.image}
            onChange={(e) => handleInputChange(e.target.value, "image")}
          />
          <div className="register_forms_buttons">
            <NavLink to="/products">
              <button className="cancelButton" onClick={(e) => clearFields()}>
                Cancelar
              </button>
            </NavLink>
            <button className="addButton" type="submit">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
