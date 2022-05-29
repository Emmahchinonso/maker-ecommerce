import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link href="/">
        <p className="logo">Maker Hoodies</p>
      </Link>
      <button type="button" className="cart-icon" onClick={() => 0}>
        <AiOutlineShopping />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
};

export default Navbar;
