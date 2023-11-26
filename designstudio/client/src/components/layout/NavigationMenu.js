// NavigationMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = ({ categories = [], subcategories = [] }) => {
  return (
    <div>
      <h3>Categories</h3>
      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            <Link to={`http://localhost:8080/api/v1/category/${category._id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>

      <h3>Subcategories</h3>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory._id}>
            <Link to={`http://localhost:8080/api/v1/subcategory/${subcategory._id}`}>{subcategory.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavigationMenu;
