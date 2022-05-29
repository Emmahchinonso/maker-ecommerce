import type { InferGetServerSidePropsType, NextPage } from "next";
import { client } from "../libs/client";
import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { Banner, Product as IProduct } from "../sanity_maker-ecommerce/schema";

const Home = ({
  products,
  bannerData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <HeroBanner bannerData={bannerData && bannerData[0]} />
      <div className="products-heading">
        <h2>Best selling products</h2>
        <p>Hoodies that speaks comfort.</p>
      </div>
      <div className="products-container">
        {products?.map((product: any) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerData={bannerData && bannerData[0]} />
    </>
  );
};

export async function getServerSideProps() {
  const query = `*[_type == "product" ]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner" ]`;
  const bannerData = await client.fetch(bannerQuery);

  console.log(products, bannerData);

  return {
    props: {
      products,
      bannerData,
    },
  };
}

export default Home;
