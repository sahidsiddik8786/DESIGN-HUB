import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Layout from '../../components/layout/Layout';
import { Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";

const DesignPage = () => {
  const [subcategoryDesigns, setSubcategoryDesigns] = useState([]);
  const { categoryId } = useParams(); // Ensure that the correct parameter name is used

  useEffect(() => {
    const fetchSubcategoryDesigns = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/categorydesign/${categoryId}/subcategorydesign`);
        setSubcategoryDesigns(response.data.subcategoryDesigns);
      } catch (error) {
        console.error('Error fetching subcategory designs:', error);
      }
    };

    fetchSubcategoryDesigns();
  }, [categoryId]);

  return (
    <Layout>
      <div className="subcategory-designs">
        <h1>Subcategory Designs</h1>
        <Grid container spacing={3}>
          {subcategoryDesigns.map((design) => (
            <Grid item key={design._id} xs={12} sm={6} md={4}>
              <Card className="mb-4" sx={{ width: "80%" }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`http://localhost:8080/api/v1/subcategorydesign/design-photo/${design._id}`}
                  alt={design.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" className="mb-2">
                    {design.name}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  );
};

export default DesignPage;
