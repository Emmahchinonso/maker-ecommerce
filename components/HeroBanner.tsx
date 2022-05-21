import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Banner } from "../sanity_maker-ecommerce/schema";

interface BannerExt extends Banner {}

type BannerProps = {
  bannerData: BannerExt | [];
};

const HeroBanner = ({ bannerData }: BannerProps) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">SMALL Text</p>
        <h3>MID TEXT</h3>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <img src="" alt="hoodies" className="hero-banner-image" />
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
