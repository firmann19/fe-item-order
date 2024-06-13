import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardPerformance from "../components/CardPerformance";

function HomePage() {
  return (
    <>
      <Navbar />
      <div
        style={{
          minHeight: "80vh",
          padding: "30px",
        }}
      >
        <CardPerformance />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
