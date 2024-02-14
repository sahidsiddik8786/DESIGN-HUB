import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { Table, Select, Row, Col, Space, Typography, Tag } from "antd";


// Styled buttons
const StyledButton = styled.button`
  padding: 10px 20px;
  margin: 10px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start; /* Align items to the top */
`;

const Content = styled.div`
  flex-grow: 1; /* Allow the content div to grow to fill the remaining space */
  display: flex;
  justify-content: center; /* Center align the content horizontally */
  align-items: flex-start; /* Align content to the top */
`;

const RegisterOptions = () => {
  return (
    <Layout title={"New Registration"}>
       <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
        <Container>
        <Content>
          <div>
            <h1>Welcome Admin!</h1>
            <StyledButton as={Link} to="staff">
              Register Staff
            </StyledButton>
            <StyledButton as={Link} to="/register-worker">
              Register Worker
            </StyledButton>
          </div>
        </Content>
      </Container>
    </Layout>
  );
};

export default RegisterOptions;
