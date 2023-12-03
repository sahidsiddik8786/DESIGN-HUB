import React, { useState, useEffect } from "react";
import UserMenu from "../../components/layout/UserMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import jsPDF from "jspdf"; // Import jspdf library
// ... (your imports)
import images from "../../images/companylogo.png"; // Replace with the actual path to your logo
import "../user/order.css";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders"
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateAndDownloadPDF = (order) => {
    const pdf = new jsPDF();

    // Set font and font size
    pdf.setFont("helvetica");
    pdf.setFontSize(12);

    // Add a border
    pdf.rect(5, 5, 200, 280); // Adjust dimensions as needed

    // Add a header with company name and logo
    pdf.setFontSize(18);
    pdf.text(100, 20, "DESIGN-STUDIO", { align: "center" });
    pdf.addImage(images, "JPEG", 20, 20, 20, 20); // Replace 'logoImage' with your logo data

    // Set font size back to 12 for the rest of the content
    pdf.setFontSize(12);

    // Add a title
    pdf.text(100, 50, "Order Details", { align: "center" });
    pdf.line(70, 55, 130, 55);

    // Add general order details
    pdf.text(20, 70, `Order Status: ${order?.status}`);
    pdf.text(20, 80, `Buyer: ${order?.buyer?.name}`);
    pdf.text(
      20,
      90,
      `Order Date: ${moment(order?.createAt).format("MMMM Do YYYY, h:mm a")}`
    );
    pdf.text(
      20,
      100,
      `Payment Status: ${order?.payment.success ? "Success" : "Failed"}`
    );
    pdf.text(20, 110, `Number of Products: ${order?.products?.length}`);

    // Add a separator line
    pdf.line(20, 120, 190, 120);

    // Loop through order details and add them to the PDF
    order.products.forEach((product, index) => {
      const yPosition = 130 + index * 20;
      pdf.text(20, yPosition, `Product: ${product.name}`);
      pdf.text(120, yPosition, `Price: $${product.price.toFixed(2)}`);
    });

    // Save the PDF with a filename based on the order ID
    pdf.save(`order_${order._id}.pdf`);
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
    <div className="container-fluid p-3 m-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <UserMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mb-4">All Orders</h1>
          {orders?.map((order, index) => (
            <div key={index} className="border shadow mb-3 order-container">
              <div className="order-header">
                <h3>Order #{index + 1}</h3>
                <p>Status: {order?.status}</p>
                <p>Date: {moment(order?.createAt).format("MMMM Do YYYY, h:mm a")}</p>
                <p>Payment: {order?.payment.success ? "Success" : "Failed"}</p>
                <p>Products: {order?.products?.length}</p>
              </div>
              <div className="order-products">
                {order?.products?.map((product, productIndex) => (
                  <div key={productIndex} className="product-details">
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                      alt={product.name}
                      className="product-image"
                    />
                    <div className="product-info">
                      <p>{product.name}</p>
                      <p>{product.description.substring(0, 30)}</p>
                      <p>Price: ${product.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="btn btn-primary mt-3"
                onClick={() => generateAndDownloadPDF(order)}
              >
                Download PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default Orders;
