import React, { useState } from 'react';
import axios from 'axios';
import "./addProduct.css"

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [priceAmount, setPriceAmount] = useState('');
  const [priceCurrency, setPriceCurrency] = useState('');
  const [images, setImages] = useState([]);

 


  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceAmountChange = (event) => {
    setPriceAmount(event.target.value);
  };

  const handlePriceCurrencyChange = (event) => {
    setPriceCurrency(event.target.value);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price[amount]', priceAmount);
      formData.append('price[currency]', priceCurrency);
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      await axios.post('http://localhost:8000/api/product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      alert('Product added successfully');
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Description:
        <textarea value={description} onChange={handleDescriptionChange} />
      </label>
      <br />
      <label>
        Price:
        <input type="text" value={priceAmount} onChange={handlePriceAmountChange} />
        <select value={priceCurrency} onChange={handlePriceCurrencyChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </label>
      <br />
      <label>
        Images:
        <input type="file" accept="image/*" multiple onChange={handleImageChange} />
      </label>
      <br />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
