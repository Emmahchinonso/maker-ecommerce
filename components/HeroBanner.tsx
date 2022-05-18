import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeroBanner = () => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL Text</p>
        <h3>MID TEXT</h3>
        <Image
          loading="eager"
          src=""
          alt="hoodies"
          className="hero-banner-image"
        />
        <div>
          <Link href="/product/10">
            <button type="button">Button Text</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>DESCRIPTION</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
