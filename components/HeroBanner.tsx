import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../libs/client";
import { Banner } from "../types";

type BannerProps = {
  bannerData: Banner;
};

const HeroBanner = ({ bannerData }: BannerProps) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{bannerData?.smallText}</p>
        <h3>{bannerData.midText}</h3>
        <h1>{bannerData.largeText1}</h1>
        <div className="hero-banner-image">
          <Image
            src={urlFor(bannerData.image!).url()}
            alt="hoodies"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div>
          <Link href={`/products/${bannerData.product}`}>
            <button type="button">{bannerData.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{bannerData.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
