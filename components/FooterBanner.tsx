import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "../libs/client";
import { Banner } from "../sanity_maker-ecommerce/schema";

type FooterProps = {
  footerData: Banner;
};

const FooterBanner = ({ footerData }: FooterProps) => {
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  } = footerData;
  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{discount}</p>
          <h3>{largeText1}</h3>
          <h3>{largeText2}</h3>
          <p>{saleTime}</p>
        </div>
        <div className="right">
          <p>{smallText}</p>
          <h3>{midText}</h3>
          <p>{desc}</p>
          <Link href={`/product/${product}`}>
            <button type="button">{buttonText}</button>
          </Link>
          <div className="footer-banner-image">
            <Image
              src={urlFor(image!).url()}
              alt="hoodies"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;
