import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import NavbarUser from "../../components/Navbar/NavbarUser";
import "./Home.css";
import { Outlet, useLocation } from "react-router-dom";

export const Home = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");

    const handleStorageChange = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loggedIn === "true");
    };

    const handleLogout = () => {
      setIsLoggedIn(false);
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("logout", handleLogout);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("logout", handleLogout);
    };
  }, []);

  
  const slides = ["/slide1.png", "/slide2.png", "/slide3.png"];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

 
  const isHomePage = location.pathname === "/user/home" || location.pathname === "/";

  return (
    <>
      {/* {isLoggedIn ? <NavbarUser /> : <Navbar />} */}

      {/* Show slider + about section ONLY on Home page */}
      {isHomePage && (
        <>
          {/* IMAGE SLIDER */}
          <div className="slider-container">
            <img src={slides[current]} alt="slider" className="slide-image" />

            {/* Left Arrow */}
            <button className="arrow left" onClick={() => {
              setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
            }}>
              ❮
            </button>

            {/* Right Arrow */}
            <button className="arrow right" onClick={() => {
              setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
            }}>
              ❯
            </button>

            {/* Dots */}
            <div className="dots">
              {slides.map((_, index) => (
                <span
                  key={index}
                  className={current === index ? "dot active" : "dot"}
                  onClick={() => setCurrent(index)}
                ></span>
              ))}
            </div>
          </div>

          {/* ABOUT SECTION */}
          <div className="about-section">
            <h2>About SAMADHAN</h2>
            <p>
              SAMADHAN is a centralized public grievance redressal system...
            </p>
            <p>
              Users can register grievances, track progress, and more.
            </p>
          </div>

          {/* WHAT'S NEW SECTION */}
          <div className="whatsnew-section">
            <h2>What's New</h2>

            <div className="news-card">
              <div className="date">
                <h3>27</h3>
                <span>July 2022</span>
              </div>
              <div className="news-text">
                Strengthening of Procedures for Redressal...
              </div>
            </div>

            <div className="news-card">
              <div className="date">
                <h3>23</h3>
                <span>July 2022</span>
              </div>
              <div className="news-text">
                Comprehensive Guidelines for Handling Public Grievances
              </div>
            </div>
          </div>
        </>
      )}

      {/* NESTED ROUTES */}
      <Outlet />
    </>
  );
};
