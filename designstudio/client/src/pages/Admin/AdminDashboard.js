import React, { useEffect, useRef } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { Card, CardContent, Typography } from "@mui/material";
import Chart from "chart.js/auto";
import './Users.css';
import Users from "./Users";
import AdminOrders from "./AdminOrders";
const AdminDashboard = () => {
  const [auth] = useAuth();
  const chartRef1 = useRef(null); // Ref for the first chart
  const chartRef2 = useRef(null); // Ref for the second chart

  useEffect(() => {
    // Chart 1: Website Views
    const ctx1 = chartRef1.current.getContext("2d");
    const websiteViewsChart = new Chart(ctx1, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "Website Views",
            data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
            borderColor: "yellow",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 900,
          easing: 'easeInOutQuad'
        },
        scales: {
          x: {
            display: true,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
              color: "white",
            }
          },
          y: {
            display: true,
            ticks: {
              stepSize: 20,
              maxTicksLimit: 6,
              color: "white",
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          }
        }
      },
    });

    // Chart 2: Add your second chart here (e.g., Page Views)
    const ctx2 = chartRef2.current.getContext("2d");
    const pageViewsChart = new Chart(ctx2, {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
          {
            label: "Page Views",
            data: [45, 72, 60, 65, 70, 80, 75, 45, 72, 60, 65, 70],
            borderColor: "black",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 900,
          easing: 'easeInOutQuad'
        },
        scales: {
          x: {
            display: true,
            ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
              color: "",
            }
          },
          y: {
            display: true,
            ticks: {
              stepSize: 20,
              maxTicksLimit: 6,
              color: "",
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'black'
            }
          }
        }
      },
    });

    // Disable scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      websiteViewsChart.destroy();
      pageViewsChart.destroy();
      // Re-enable scrolling when component unmounts
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Layout>
      <div style={{ minHeight: "100vh" }}>
        <div className="row">
          <div className="col-md-2">
            <AdminMenu />
          </div>
          <div className="col-md-10">
            <div className="row md-10">
              <div className="col-md-6">
                <div className="card card-chart" style={{ position: 'relative', height: '30vh', width: '50%' }}>
                  <div className="card-header-rose" data-header-animation="true">
                    <div className="chart-container" style={{ position: 'relative', height: '100%', width: '100%' }}>
                      <canvas ref={chartRef1} id="websiteViewsChart"></canvas>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card card-chart" style={{ position: 'relative', height: '30vh', width: '50%' }}>
                  <div className="card-header-rose" data-header-animation="true">
                    <div className="chart-containerr" style={{ position: 'relative', height: '100%', width: '100%' }}>
                      <canvas ref={chartRef2} id="pageViewsChart"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-12">
              <Users />
            </div>
          
            <div className="col-md-12">
              <AdminOrders />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
