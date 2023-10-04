import React from "react";
import Layout from "../components/layout/Layout";
//import { useAuth } from "../context/auth";
import "./pages.css";

const HomePage = () => {
  //const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Design Studio"}>
      <header id="header">
        <div className="intro">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="intro-text">
                  <h1>
                    <strong>NEST</strong> <span>/</span> Interior Design Studio
                  </h1>
                  <p>Lorem ipsum dolor sit amet consectetur adipiscing.</p>
                  <a
                    href="#about"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Learn More
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* About Section */}
      <div id="about">
        <div className="container">
          <div className="section-title text-center center">
            <h2>Our Story</h2>
            <hr />
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-6 text-center">
              <img
                src="img/about.jpg"
                className="img-responsive"
                alt=""
              />
            </div>
            <div className="col-xs-12 col-md-6">
              <div className="about-text">
                <h3>The Studio</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Duis sed dapibus leo nec ornare diam. Sed commodo nibh ante
                  facilisis bibendum dolor feugiat at. Duis sed dapibus leo
                  nec ornare diam commodo nibh.
                </p>
                <h3>How We Work</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Duis sed dapibus leo nec ornare diam. Sed commodo nibh ante
                  facilisis bibendum dolor feugiat at. Duis sed dapibus leo
                  nec ornare.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div id="services">
        <div className="container">
          <div className="col-md-10 col-md-offset-1 section-title text-center">
            <h2>Our Services</h2>
            <hr />
            <p></p>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-4 service">
              <img
                src="img/residential-design.jpg"
                className="img-responsive"
                alt="Project Title"
              />
            </div>
            <div className="col-xs-12 col-sm-4 service">
              <img
                src="img/office-design.jpg"
                className="img-responsive"
                alt="Project Title"
              />
            </div>
            <div className="col-xs-12 col-sm-4 service">
              <img
                src="img/commercial-design.jpg"
                className="img-responsive"
                alt="Project Title"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Portfolio Section */}
      <div id="portfolio">
        <div className="container">
          <div className="section-title text-center center">
            <h2>Projects</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className="categories">
            <ul className="cat">
              <li>
                <ol className="type">
                  <li>
                    <a href="#" data-filter="*" className="active">
                      All Projects
                    </a>
                  </li>
                  <li>
                    <a href="#" data-filter=".residential">
                      Residential
                    </a>
                  </li>
                  <li>
                    <a href="#" data-filter=".office">
                      Office
                    </a>
                  </li>
                  <li>
                    <a href="#" data-filter=".commercial">
                      Commercial
                    </a>
                  </li>
                </ol>
              </li>
            </ul>
            <div className="clearfix" />
          </div>
          <div className="row">
            <div className="portfolio-items">
              {/* Add your portfolio items here */}
            </div>
          </div>
        </div>
      </div>
      {/* Team Section */}
      <div id="team" className="text-center">
        <div className="overlay">
          <div className="container">
            <div className="col-md-8 col-md-offset-2 section-title">
              <h2>Meet the Team</h2>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
                dapibus leonec.
              </p>
            </div>
            <div id="row">
              <div className="col-md-3 col-sm-6 team">
                <div className="thumbnail">
                  <img src="img/team/01.jpg" alt="..." className="team-img" />
                  <div className="caption">
                    <h3>John Doe</h3>
                    <p>Director</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6 team">
                <div className="thumbnail">
                  <img
                    src="img/team/02.jpg"
                    alt="..."
                    className="img-circle team-img"
                  />
                  <div className="caption">
                    <h3>Mike Doe</h3>
                    <p>Senior Designer</p>
                  </div>
                </div>
              </div>
              {/* Add more team members here */}
            </div>
          </div>
        </div>
      </div>
      {/* Contact Section */}
      <div id="contact">
        <div className="container">
          <div className="section-title text-center">
            <h2>Contact Us</h2>
            <hr />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <div className="col-md-4">
            <h3>Contact Info</h3>
            <div className="contact-item">
              <span>Address</span>
              <p>
                4321 California St,
                <br />
                San Francisco, CA 12345
              </p>
            </div>
            <div className="contact-item">
              <span>Email</span>
              <p>info@company.com</p>
            </div>
            <div className="contact-item">
              <span>Phone</span>
              <p> +1 123 456 1234</p>
            </div>
          </div>
          <div className="col-md-8">
            <h3>Leave us a message</h3>
            <form
              name="sentMessage"
              id="contactForm"
              noValidate=""
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Name"
                      required="required"
                    />
                    <p className="help-block text-danger" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Email"
                      required="required"
                    />
                    <p className="help-block text-danger" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  className="form-control"
                  rows={4}
                  placeholder="Message"
                  required=""
                  defaultValue={""}
                />
                <p className="help-block text-danger" />
              </div>
              <div id="success" />
              <button type="submit" className="btn btn-custom btn-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
