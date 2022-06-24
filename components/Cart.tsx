import React from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/stateContext";
import { urlFor } from "../libs/client";
import Image from "next/image";

const Cart = () => {
  const cartRef = React.useRef<HTMLDivElement | null>(null);
  console.log("ref", cartRef.current);
  // prettier-ignore
  const { totalPrice, totalQuantity, cartItems, setShowCart } = useStateContext();
  console.log(cartItems);
  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">{totalQuantity} item(s)</span>
        </button>
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty.</h3>
            <Link href="/">
              <button className="btn" onClick={() => setShowCart(false)}>
                Continue Shopping
              </button>
            </Link>
          </div>
        )}
        <div className="product-container">
          {cartItems.length > 0 &&
            cartItems.map((item) => (
              <div className="product" key={item._id}>
                <div className="cart-product-image">
                  <Image
                    src={urlFor(item!.image![0]).url()}
                    alt=""
                    layout="fill"
                  />
                </div>
                <div className="item-desc">
                  <div className="flex top">
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className="flex bottom">
                    <div>
                      <p className="quantity-desc">
                        <span className="minus" onClick={() => {}}>
                          <AiOutlineMinus />
                        </span>
                        <span className="num">0</span>
                        <span className="plus" onClick={() => {}}>
                          <AiOutlinePlus />
                        </span>
                      </p>
                    </div>
                    <button className="remove-item" onClick={() => {}}>
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length > 0 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button className="btn" onClick={() => {}}>
                Pay with Paystack
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
