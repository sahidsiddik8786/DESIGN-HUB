// DesignPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"; // Import useParams to retrieve URL parameters
import Layout from "../../components/layout/Layout";

const DesignPage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const { categoryId } = useParams(); // Retrieve categoryId from URL parameters

  useEffect(() => {
    const getSubcategories = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/categorydesign/${categoryId}/subcategories`
        );
        setSubcategories(data.subcategories);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching subcategories");
      }
    };

    getSubcategories();
  }, [categoryId]); // Include categoryId in the dependency array

  return (
    <Layout>
      <div>
        <h2>Subcategories</h2>
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory._id}>{subcategory.name}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
};

export default DesignPage;
