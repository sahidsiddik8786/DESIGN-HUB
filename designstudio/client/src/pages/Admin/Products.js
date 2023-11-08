import React, { useState, useEffect } from "react";
import AdminMenu from '../../components/layout/AdminMenu'
import Layout from '../../components/layout/Layout'
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import './Users.css'

const Products = () => {
  const [products, setProducts] = useState([]);

  // Function to get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method to load products on initial render
  useEffect(() => {
    getAllProducts();
  }, []);

  // Function to refresh the products when a new product is created
  const refreshProducts = () => {
    getAllProducts();
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Products Upload </h1>
          <div className="product-grid">
            {products?.map((p) => (
              <Link
                key={p._id}
                to={`http://localhost:8080/dashboard/admin/product/${p.slug}`}
                className="product-link"
              >
                <div className="product-card">
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                    className="product-image"
                    alt={p.name}
                  />
                  <div className="product-details">
                    <h5 className="product-title">{p.name}</h5>
                    <p className="product-description">{p.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
