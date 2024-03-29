import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UserImagesPage = () => {
  const { userId } = useParams();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/site/user/${userId}/images`);
        setImages(response.data.map(site => site.images).flat()); // Assuming each site has an images array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user images: ', error);
        setLoading(false);
      }
    };

    fetchUserImages();
  }, [userId]);

  return (
    <div>
      <h1>User Images</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row image-container">
          {images.map((imageData, index) => (
            <div key={index} className="col-md-3 mb-4"> {/* Adjust col size based on your design */}
              <div className="card">
                <img src={imageData.data} alt={`User Image ${index}`} className="card-img-top" />
                <div className="card-body">
                  <p className="card-text">Image {index + 1}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserImagesPage;
