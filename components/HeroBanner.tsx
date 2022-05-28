import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { client, urlFor } from "../libs/client";
import { Banner } from "../sanity_maker-ecommerce/schema";

interface BannerExt extends Banner {}

type BannerProps = {
  bannerData: BannerExt;
};

const HeroBanner = ({ bannerData }: BannerProps) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{bannerData?.smallText}</p>
        <h3>{bannerData.midText}</h3>
        <h1>{bannerData.largeText1}</h1>
        {/*eslint-disable-next-line @next/next/no-img-element*/}
        <div className="hero-banner-image">
          <Image
            src={urlFor(bannerData.image).url()}
            alt="hoodies"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div>
          <Link href={`/product/${bannerData._id}`}>
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
