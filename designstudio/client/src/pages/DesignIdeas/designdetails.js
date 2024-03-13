// DesignDetailPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./design.css";

const DesignDetailPage = () => {
  const [design, setDesign] = useState({});
  const { designSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (designSlug) {
      fetchDesignDetails();
    }
  }, [designSlug]);

  const fetchDesignDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/design/get-design/${designSlug}`
      );
      setDesign(data?.design);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching design details", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) return <Layout>Loading...</Layout>;
  if (error) return <Layout>Error: {error}</Layout>;

  return (
    <Layout>
      <div className="design-detail-container">
        <div className="design-image">
          <img
            src={`http://localhost:8080/api/v1/design/design-photo/${design._id}`}
            alt={design.name}
          />
        </div>
        <div className="design-info">
          <h1>{design.name}</h1>
          <div className="design-features">
            {/* Icons and feature highlights here */}
          </div>
          <div className="design-details">
            <h3>Kitchen Design Details:</h3>
            <p><strong>Room Dimension:</strong> {design.roomDimension}</p>
            <p><strong>Style:</strong> {design.style}</p>
            <p><strong>Color:</strong> {design.color}</p>
            <p><strong>Shutter Finish:</strong> {design.shutterFinish}</p>
            <p><strong>Countertop Material:</strong> {design.countertopMaterial}</p>
            <p><strong>Storage Features:</strong> {design.storageFeatures}</p>
            <p><strong>Special Features:</strong> {design.specialFeatures}</p>
            <p><strong>Ideal for:</strong> {design.idealFor}</p>
            {/* Additional details as needed */}
          </div>
          <div className="button-groups">
            <button className="button">
              Book Free Consultation
            </button>
    
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DesignDetailPage;
