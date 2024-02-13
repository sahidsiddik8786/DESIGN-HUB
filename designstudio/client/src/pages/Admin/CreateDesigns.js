import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { Select, message } from "antd";
import { useNavigate } from "react-router-dom";
import { CButton, CForm, CFormInput } from "@coreui/react";

const { Option } = Select;

const CreateDesign = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [layout, setLayout] = useState("");
  const [roomDimension, setRoomDimension] = useState("");
  const [photo, setPhoto] = useState("");
  const [validated, setValidated] = useState(false);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/categorydesign/get-categorydesign"
      );
      if (data.success) {
        setCategories(data.categorydesign);
      }
    } catch (error) {
      console.log(error);
      message.error("Error while getting categories.");
    }
  };

  const getSubcategories = async (categoryId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/categorydesign/${categoryId}/subcategorydesign`
      );
      if (data?.success) {
        setSubcategories(data?.subcategory || []); // Clear subcategories if none are returned
      } else {
        console.log("Error: No subcategories found or success flag is missing");
        setSubcategories([]); // Clear subcategories if the API call was unsuccessful
      }
    } catch (error) {
      console.log(error);
      message.error("Error while getting subcategories.");
      setSubcategories([]); // Clear subcategories if there's an exception
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleCategoryChange = (value) => {
    setCategory(value);
    setSubcategory(""); // Reset subcategory when category changes
    if (value) {
      // Only call getSubcategories if a category is actually selected
      getSubcategories(value);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const designData = new FormData();
        designData.append("name", name);
        designData.append("description", description);
        designData.append("price",price);
        designData.append("photo", photo);
        designData.append("layout", layout);
        designData.append("roomDimension", roomDimension);
        designData.append("category", category);
        designData.append("subcategory", subcategory);


        const { data } = await axios.post(
          "http://localhost:8080/api/v1/design/create-design",
          designData
        );

        if (data?.success) {
          toast.success("Design Created Successfully");
          navigate("/Dashboard/AdminDashboard/designs");
        } else {
          toast.success("Design not Created");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }

    setValidated(true);
  };

  return (
    <Layout>
      <>
        <div className="design-form">
          <div className="container-fluid m-3 p-3">
            <div className="row">
              <div className="col-md-3">
                <AdminMenu />
              </div>
              <div className="col-md-9">
                <h1>Design Upload</h1>
                <div className="m-1 w-75">
                  <CForm
                    className="mb-3"
                    noValidate
                    validated={validated}
                    onSubmit={handleCreate}
                  >
                    <Select
                      bordered={false}
                      placeholder="Select a category"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={handleCategoryChange}
                      value={category}
                    >
                      {categories?.map((c) => (
                        <Option key={c._id} value={c._id}>
                          {c.name}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      bordered={false}
                      placeholder="Select a subcategory"
                      size="large"
                      showSearch
                      className="form-select mb-3"
                      onChange={(value) => setSubcategory(value)}
                      value={subcategory}
                    >
                      {subcategories?.map((s) => (
                        <Option key={s._id} value={s._id}>
                          {s.name}
                        </Option>
                      ))}
                    </Select>

                    <div className="mb-3">
                      <label className="btn btn-outline-secondary col-md-12">
                        {photo ? photo.name : "Upload Photo"}
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={(e) => setPhoto(e.target.files[0])}
                          hidden
                        />
                      </label>
                    </div>
                    <div className="mb-3">
                      {photo && (
                        <div className="text-center">
                          <img
                            src={URL.createObjectURL(photo)}
                            alt="product_photo"
                            height={"200px"}
                            className="img img-responsive"
                          />
                        </div>
                      )}
                    </div>

                    <CFormInput
                      type="text"
                      value={name}
                      placeholder="Write a name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <CFormInput
                      as="textarea"
                      rows="3"
                      value={description}
                      placeholder="Write a description"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    <CFormInput
                      type="number"
                      value={price}
                      placeholder="Write a price per squarefeet"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                    <CFormInput
                      type="text"
                      value={layout}
                      placeholder="Write a layout"
                      onChange={(e) => setLayout(e.target.value)}
                      required
                    />
                    <CFormInput
                      type="text"
                      value={roomDimension}
                      placeholder="Write room dimension"
                      onChange={(e) => setRoomDimension(e.target.value)}
                      required
                    />
                    <CButton color="primary" type="submit">
                      Create Design
                    </CButton>
                  </CForm>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default CreateDesign;
