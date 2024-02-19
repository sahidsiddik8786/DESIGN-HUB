// Designs.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import "./Exploredesigns.css";

const Designs = () => {
  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend upon component mount
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/categorydesign/get-categorydesign"
        );
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/image/get-designimg"
      );
      setDesigns(data.designs);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  console.log("Designs:", designs);
  console.log("Categories:", categories);

  return (
    <Layout>
      <div className="interior-design">
        <h1>Home Interior Design</h1>
        <p>
          We bring you carefully-curated interior design ideas, to give your
          home a brand new look. Explore exclusive
          <br /> interior designs and trends that are every bit inspirational as
          they are practical. Our team of interior designers
          <br /> have put together ideas across kitchen, bedroom, living room
          and more,to help you pick a design that will best
          <br /> suit your home interior requirements.
        </p>
        <div className="d-flex flex-wrap">
          {designs?.map((design) => (
            <div key={design._id} className="category-card">
              <Link
                to={`/subcategories/${design._id}`} // Update the link to navigate to subcategories page
              >
                <div
                  className="card m-3"
                  style={{ width: "24rem", height: "19rem" }}
                >
                  <img
                    src={`http://localhost:8080/api/v1/image/designimg-photo/${design._id}`}
                    className="card-img-top"
                    alt={design.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{design.name}</h5>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Designs;
