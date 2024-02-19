// SubcategoriesPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SubcategoriesPage = () => {
  const { categoryId } = useParams();
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    // Fetch subcategories for the selected category from backend upon component mount
    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/categorydesign/${categoryId}/subcategorydesign`);
        setSubcategories(response.data.subcategories);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubcategories();
  }, [categoryId]);

  return (
    <div>
      <h1>Subcategories for Category {categoryId}</h1>
      <div className="subcategory-list">
        {subcategories.map(subcategory => (
          <div key={subcategory.id} className="subcategory-card">
            <h3>{subcategory.name}</h3>
            <p>{subcategory.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoriesPage;
