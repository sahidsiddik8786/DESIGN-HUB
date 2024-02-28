import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import { Link } from "react-router-dom";

const DesignPage = () => {
  const [designs, setDesigns] = useState([]);
  const { categoryId } = useParams();

  useEffect(() => {
    const getDesignsByCategory = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8080/api/v1/design/by-category/${categoryId}`
        );
        if (data.success) {
          setDesigns(data.designs);
        } else {
          toast.error("No designs found for this category");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching designs");
      }
    };

    if (categoryId) {
      getDesignsByCategory();
    }
  }, [categoryId]);

  return (
    <Layout>
      <div className="interior-design">
        {/* Display the page heading here
        {designs.length > 0 && <h1>{designs[0].name}</h1>}  */}

        <div className="d-flex flex-wrap">
          {designs.map((design) => (
            <Link key={design._id} to={`/dashboard/admin/design/${design.slug}`} className="product-link">
              <div className="card m-3" style={{ width: "23rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/design/design-photo/${design._id}`}
                  className="card-img-top"
                  alt={design.name}
                  style={{ width: "100%", height: "auto" }}
                />
                <div className="card-body">
                  <h6 className="card-title">{design.name}</h6>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default DesignPage;
