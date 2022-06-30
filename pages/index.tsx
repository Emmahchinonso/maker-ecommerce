import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { client } from "../libs/client";
import React from "react";
import { Product, FooterBanner, HeroBanner } from "../components";
import { Banner, IProduct } from "../types";

type Props = {
  products: IProduct[];
  bannerData: Banner[];
};

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
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerData={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const query = `*[_type == "product" ]`;
  const products = await client.fetch(query);

  const bannerQuery = `*[_type == "banner" ]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};

export default Home;
