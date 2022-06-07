import Image from "next/image";
import React from "react";
import { client, urlFor } from "../../libs/client";
import { ParsedUrlQuery } from "querystring";
import { Product as IProduct } from "../../sanity_maker-ecommerce/schema";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";

type Props = {
  product: IProduct;
  similarProducts: IProduct[];
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

const ProductDetails = ({
  product,
  similarProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { image, name, price, details } = product;
  const [index, setIndex] = React.useState(0);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="product-detail-image">
            <Image
              src={urlFor(image && image[index]).url()}
              alt={`product ${name} imag`}
              width="300"
              height="300"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <div
                key={i}
                className={
                  i == index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              >
                <Image src={urlFor(item).url()} width="50" height="50" alt="" />
              </div>
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>{20}</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={() => {}}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={() => {}}>
                0
              </span>
              <span className="plus" onClick={() => {}}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => {}}>
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={() => {}}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {similarProducts.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const query = `*[_type == "product" && slug.current == "${params?.slug}"][0]`;
  const similarProductsQuery = `*[_type == "product"]`;

  const product = await client.fetch(query);
  const similarProducts = await client.fetch(similarProductsQuery);

  return {
    props: {
      product,
      similarProducts,
    },
  };
};

export async function getStaticPaths() {
  const query = `*[_type == "product"]{
    slug {
      current
    }
  }`;

  const productsIds = await client.fetch(query);

  const paths = productsIds.map((product: any) => ({
    params: { slug: product.slug.current },
  }));
  return { paths, fallback: "blocking" };
}

export default ProductDetails;
