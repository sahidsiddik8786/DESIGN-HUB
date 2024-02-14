import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Select, Row, Col, Space, Typography, Tag } from "antd";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
const { Option } = Select;
const { Title } = Typography;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
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
      title: "Order",
      dataIndex: "orderNumber",
      key: "orderNumber",
      render: (text, record, index) => index + 1,
      sorter: (a, b) => a.orderNumber - b.orderNumber,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Delivered" ? "green" : status === "Cancel" ? "red" : "blue"}>{status}</Tag>
      ),
      sorter: (a, b) => a.status.localeCompare(b.status),
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
      render: (createAt) => moment(createAt).format("YYYY-MM-DD "),
      sorter: (a, b) => moment(a.createAt).unix() - moment(b.createAt).unix(),
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => (
        <span>{payment.success ? <Tag color="green">Success</Tag> : <Tag color="red">Failed</Tag>}</span>
      ),
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
      <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
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
              scroll={{ x: true }}
              bordered // Add bordered prop to the Table component to apply built-in border styles
              className="custom-table" // Add a custom class for additional styling
              style={{ background: "#f5f5f5" }} // Set background color for the entire table
              headerStyle={{ background: "#1890ff", color: "#fff" }} // Set background and text color for the table header
            />
          </Space>
        </Col>
      </Row>
    </Layout>
  );
};

export default AdminOrders;
