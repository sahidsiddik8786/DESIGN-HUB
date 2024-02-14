import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import './Users.css';

const AdminDashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div>
        <div className="row">
          <div className="col-md-2 pl-0">
            <AdminMenu />
          </div>
          <div className="col-md-9 content-area" style={{ backgroundImage: 'url("https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
            <div className="card p-5">
              <h2>Admin Dashboard</h2>
              <form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Admin Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={auth?.user?.firstname}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Admin Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={auth?.user?.email}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="contact" className="form-label">
                    Admin Contact:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="contact"
                    value={auth?.user?.phone}
                    readOnly
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
