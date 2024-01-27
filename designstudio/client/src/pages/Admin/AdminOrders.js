import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Select, Row, Col, Space, Typography } from "antd";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
const { Option } = Select;
const { Title, Text } = Typography;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "delivered",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`http://localhost:8080/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "Order #",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Buyer",
      dataIndex: "buyer",
      key: "buyer",
      render: (buyer) => buyer?.name,
    },
    {
      title: "Date",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => moment(createAt).fromNow(),
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => (payment.success ? "Success" : "Failed"),
    },
    {
      title: "Quantity",
      dataIndex: "products",
      key: "products",
      render: (products) => products?.length,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Select
          bordered={false}
          onChange={(value) => handleChange(record._id, value)}
          defaultValue={record.status}
        >
          {status.map((s, i) => (
            <Option key={i} value={s}>
              {s}
            </Option>
          ))}
        </Select>
      ),
    },
  ];

  return (
    <Layout title={"All Orders Data"}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <AdminMenu />
        </Col>
        <Col xs={24} md={18}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Title level={2} className="text-center">
              All Orders
            </Title>
            <Table
              dataSource={orders}
              columns={columns}
              rowKey={(record) => record._id}
              pagination={false}
            />
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};

export default AdminOrders;
