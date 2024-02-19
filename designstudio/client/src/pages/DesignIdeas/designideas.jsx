import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Card, CardMedia, CardContent, Typography, Grid } from "@mui/material";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

import "../../pages/pages.css";
import { Checkbox as AntCheckbox, Radio as AntRadio } from 'antd';
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";

const DesignPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [designs, setDesigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [isInWishlist, setIsInWishlist] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);

    const isInWishlistArray = designs.map((design) => wishlist.some((item) => item._id === design._id));
    setIsInWishlist(isInWishlistArray);

  }, [wishlist, designs]);

  const handleToggleWishlist = (designId) => {
    const designIndex = designs.findIndex((design) => design._id === designId);
    const updatedWishlist = [...wishlist];
  
    if (designIndex !== -1) {
      const designs = designs[designIndex];
  
      const isDesignsInWishlist = updatedWishlist.some((item) => item._id === designId);
  
      if (!isDesignsInWishlist) {
        updatedWishlist.push(designs);
      } else {
        updatedWishlist.splice(designIndex, 1);
      }
  
      setWishlist(updatedWishlist);
  
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/categorydesign/get-categorydesign");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllDesigns = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/design/design-list/${page}`);
      setLoading(false);
      setDesigns(data.designs);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/design/design-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:8080/api/v1/design/design-list/${page}`);
      setLoading(false);
      setDesigns([...designs, ...data?.designs]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllDesigns();
  }, [checked.length, radio.length]);


  return (
    <Layout title={"All Products - Best offers "}>

      <div className="container-fluid row mt-3">
        <div className="col-md-9 offset-1">
          <h1 className="text-center">Explore Designs</h1>
          <Grid container spacing={3}>
            {designs?.map((p , index) => (
              <Grid item key={p._id} xs={12} sm={6} md={4}>
                <Card className="mb-4" sx={{ width: "80%" }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:8080/api/v1/design/design-photo/${p._id}`}
                    alt={p.name}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div" className="mb-2">
                      {p.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="m-2 p-3">
            {designs && designs.length < total && (
              <Button
                variant="contained"
                color="warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </Button>
            )}
          </div>
          {/*<Button
            component={Link}
            to="/wishlist"
            variant="contained"
            color="primary"  
            className="mt-3"
          >
            View Wishlist
            </Button>*/}
        </div>
      </div>
    </Layout>
  );
}

export default DesignPage;
