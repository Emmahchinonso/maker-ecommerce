import type { NextPage } from "next";
import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home: NextPage = () => {
  return (
    <>
      <HeroBanner />

      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Hoodies that speaks comfort.</p>
      </div>
      <div className="products-container">
        {["Product 1", "Product 2"].map((product) => product)}
      </div>

      <FooterBanner />
    </>
  );
};

export default Home;
