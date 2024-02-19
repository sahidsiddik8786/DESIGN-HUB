// SubcategoriesPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

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
      <Grid container spacing={3}>
        {subcategories.map(subcategory => (
          <Grid item xs={12} sm={6} md={4} key={subcategory.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {subcategory.name}
                </Typography>
                <Typography color="textSecondary">
                  {subcategory.description}
                </Typography>
                {/* You can add more details or customize the UI here */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SubcategoriesPage;
