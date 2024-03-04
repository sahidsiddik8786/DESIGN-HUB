// DesignDetailPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import "./designideas.css";

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
      const { data } = await axios.get(`http://localhost:8080/api/v1/design/get-design/${designSlug}`);
      setDesign(data?.design);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching design details", error);
      setError(error.message);
      setLoading(false);
    }
  };
  

  return (
    <Layout>
      <div className="design-detail">

      <img
  src={design._id ? `http://localhost:8080/api/v1/design/design-photo/${design._id}` : ""}
  style={{ width: "100%", height: "100%" }}
  alt={design.name}
/>

             
           
            <div className="design-info">
              <h2>{design.name}</h2>
              <p>{design.description}</p>
              {/* Display other design details here */}
            </div>
     
        {error && <p>Error: {error}</p>}
      </div>
    </Layout>
  );
};

export default DesignDetailPage;
