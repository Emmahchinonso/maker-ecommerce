import React from "react";
import { Product } from "../sanity_maker-ecommerce/schema";
import Link from "next/link";
import { urlFor } from "../libs/client";
import Image from "next/image";

type ProductProps = {
  product: Product;
};

const Product = ({ product }: ProductProps) => {
  const { slug, name, image, price } = product;

  return (
    <>
      <Link href={`/products/${slug?.current}`}>
        <div className="product-card">
          <div className="product-image">
            <Image
              src={urlFor(image && image[0]).url()}
              alt="hoodies"
              width="200"
              height="200"
            />
          </div>
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </>
  );
};

export default Product;
