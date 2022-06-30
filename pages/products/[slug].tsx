import Image from "next/image";
import React from "react";
import { client, urlFor } from "../../libs/client";
import { ParsedUrlQuery } from "querystring";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/stateContext";
import { IProduct } from "../../types";

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
  const { onAdd, setShowCart } = useStateContext();
  const [qty, setQty] = React.useState(1);

  function buyNow() {
    onAdd(product, qty);
    setShowCart(true);
  }

  function incQty() {
    setQty((prevQty) => prevQty + 1);
  }

  function decQty() {
    setQty((prevQty) => {
      if (prevQty === 0) return prevQty;
      return prevQty - 1;
    });
  }

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="product-detail-image">
            <Image
              src={urlFor(image! && image[index]).url()}
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
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={buyNow}>
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
      key: params!.slug,
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
