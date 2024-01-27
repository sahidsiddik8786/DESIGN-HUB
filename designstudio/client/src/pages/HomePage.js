import React from "react";
import Layout from "../components/layout/Layout";
//import { useAuth } from "../context/auth";
import "./pages.css";

const HomePage = () => {
  //const [auth, setAuth] = useAuth();

  return (
    <Layout title={"Design Studio"}>
{/*
<>

  <main>

    <div className="slider-area">
      <div className="slider-active dot-style">


        <div className="single-slider slider-height hero-overly d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <div className="hero__caption">
                  <span data-animation="fadeInLeft" data-delay=".4s">
                    Welcome to Intorior
                  </span>
                  <h1 data-animation="fadeInLeft" data-delay=".6s">
                    Modern Interior &amp; Design
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div className="services-area section-padding3">
      <div className="container">
        <div className="row justify-content-center">
          <div className="cl-xl-7 col-lg-8 col-md-10">
     
            <div className="section-tittle text-center mb-70">
              <span>Our Professional Services</span>
              <h2>Best Interitor Services</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="single-services mb-200">
              <div className="services-img">
                <img src="assets/img/gallery/services1.png" alt="" />
              </div>
              <div className="services-caption">
                <h3>
                  <a href="services.html">Lighting</a>
                </h3>
                <p className="pera1">For each project we establish </p>
                <p className="pera2">
                  For each project we establish relationships with partners who
                  we know will help us.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="single-services mb-200">
              <div className="services-img">
                <img src="assets/img/gallery/services2.png" alt="" />
              </div>
              <div className="services-caption">
                <h3>
                  <a href="services.html">Interior Design</a>
                </h3>
                <p className="pera1">For each project we establish </p>
                <p className="pera2">
                  For each project we establish relationships with partners who
                  we know will help us.{" "}
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-10">
            <div className="single-services mb-200">
              <div className="services-img">
                <img src="assets/img/gallery/services3.png" alt="" />
              </div>
              <div className="services-caption">
                <h3>
                  <a href="services.html">Office Decoretion</a>
                </h3>
                <p className="pera1">For each project we establish </p>
                <p className="pera2">
                  For each project we establish relationships with partners who
                  we know will help us.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="gallery-area">
      <div className="container-fluid p-0 fix">
        <div className="row">
          <div className="col-xl-6 col-lg-4 col-md-6">
            <div className="single-gallery mb-30">
              <div
                className="gallery-img"
                style={{
                  backgroundImage: "url(assets/img/gallery/gallery1.png)"
                }}
              />
              <div className="thumb-content-box">
                <div className="thumb-content">
                  <h3>
                    <span>Intorior</span>Burj Khalifa
                  </h3>
                  <a href="work.html">
                    <i className="fas fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="single-gallery mb-30">
              <div
                className="gallery-img"
                style={{
                  backgroundImage: "url(assets/img/gallery/gallery2.png)"
                }}
              />
              <div className="thumb-content-box">
                <div className="thumb-content">
                  <h3>
                    <span>Intorior</span>Burj Khalifa
                  </h3>
                  <a href="work.html">
                    <i className="fas fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="single-gallery mb-30">
              <div
                className="gallery-img"
                style={{
                  backgroundImage: "url(assets/img/gallery/gallery3.png)"
                }}
              />
              <div className="thumb-content-box">
                <div className="thumb-content">
                  <h3>
                    <span>Intorior</span>Burj Khalifa
                  </h3>
                  <a href="work.html">
                    <i className="fas fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="single-gallery mb-30">
              <div
                className="gallery-img"
                style={{
                  backgroundImage: "url(assets/img/gallery/gallery4.png)"
                }}
              />
              <div className="thumb-content-box">
                <div className="thumb-content">
                  <h3>
                    <span>Intorior</span>Burj Khalifa
                  </h3>
                  <a href="work.html">
                    <i className="fas fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="single-gallery mb-30">
              <div
                className="gallery-img"
                style={{
                  backgroundImage: "url(assets/img/gallery/gallery5.png)"
                }}
              />
              <div className="thumb-content-box">
                <div className="thumb-content">
                  <h3>
                    <span>Intorior</span>Burj Khalifa
                  </h3>
                  <a href="work.html">
                    <i className="fas fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-4 col-md-6">
            <div className="single-gallery mb-30">
              <div
                className="gallery-img"
                style={{
                  backgroundImage: "url(assets/img/gallery/gallery6.png)"
                }}
              />
              <div className="thumb-content-box">
                <div className="thumb-content">
                  <h3>
                    <span>Intorior</span>Burj Khalifa
                  </h3>
                  <a href="work.html">
                    <i className="fas fa-angle-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="team-area section-padding30">
      <div className="container">
        <div className="row justify-content-center">
          <div className="cl-xl-7 col-lg-8 col-md-10">

            <div className="section-tittle text-center mb-70">
              <span>Creative derector</span>
              <h2>Best Interitor Services</h2>
            </div>
          </div>
        </div>
        <div className="row">

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
            <div className="single-team mb-30">
              <div className="team-img">
                <img src="assets/img/gallery/team2.png" alt="" />
              </div>

            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
            <div className="single-team mb-30">
              <div className="team-img">
                <img src="assets/img/gallery/team3.png" alt="" />
              </div>

            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-">
            <div className="single-team mb-30">
              <div className="team-img">
                <img src="assets/img/gallery/team1.png" alt="" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="testimonial-area testimonial-padding">
      <div className="container">

        <div className="row d-flex justify-content-center">
          <div className="col-xl-8 col-lg-8 col-md-10">
            <div className="h1-testimonial-active dot-style">

              <div className="single-testimonial text-center">
   
                <div className="testimonial-caption ">
                  <div className="testimonial-top-cap">
                    <img src="assets/img/gallery/testi-logo.png" alt="" />
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip
                    </p>
                  </div>
      
                  <div className="testimonial-founder  ">
                    <div className="founder-img">
                      <span>
                        <strong>Christine Eve</strong> - Co Founder
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="single-testimonial text-center">
         
                <div className="testimonial-caption ">
                  <div className="testimonial-top-cap">
                    <img src="assets/img/gallery/testi-logo.png" alt="" />
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip
                    </p>
                  </div>
     
                  <div className="testimonial-founder  ">
                    <div className="founder-img">
                      <span>
                        <strong>Christine Eve</strong> - Co Founder
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <section className="wantToWork-area w-padding2">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-xl-8 col-lg-8 col-md-8">
            <div className="wantToWork-caption wantToWork-caption2">
              <h2>Are you Searching For a First-Class Consultant?</h2>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="home-blog-area section-padding30">
      <div className="container">

        <div className="row">
          <div className="col-lg-12">
            <div className="section-tittle text-center mb-70">
              <span>Our latest blog</span>
              <h2>Our recent news</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="home-blog-single mb-30">
              <div className="blog-img-cap">
                <div className="blog-img">
                  <img src="assets/img/gallery/home_blog1.png" alt="" />
                </div>
                <ul>
                  <li className="black-bg">October 27, 2020</li>
                  <li>By Admin - 30 Likes - 4 Comments</li>
                </ul>
                <div className="blog-cap">
                  <h3>
                    <a href="blog_details.html">
                      16 Easy Ideas to Use Everyday Stuff in Kitchen.
                    </a>
                  </h3>
                  <a href="blog_details.html" className="more-btn">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6">
            <div className="home-blog-single mb-30">
              <div className="blog-img-cap">
                <div className="blog-img">
                  <img src="assets/img/gallery/home_blog2.png" alt="" />
                </div>
                <ul>
                  <li className="black-bg">October 27, 2020</li>
                  <li>By Admin - 30 Likes - 4 Comments</li>
                </ul>
                <div className="blog-cap">
                  <h3>
                    <a href="blog_details.html">
                      16 Easy Ideas to Use Everyday Stuff in Kitchen.
                    </a>
                  </h3>
                  <a href="blog_details.html" className="more-btn">
                    Read more
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </main>
</>
              */}
    </Layout>
  );
};

export default HomePage;
