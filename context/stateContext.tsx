import React from "react";
import { Toast } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

interface ContextInterface {}

const Context = React.createContext<ContextInterface | null>(null);

const StateContext = ({ children }: Props) => {
  const [showCart, setShowCart] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);
  const [showPrice, setShowPrice] = React.useState("");
  const [totalQuantity, setTotalQuantity] = React.useState(1);
  const [qty, setQty] = React.useState(1);

  return (
    <Context.Provider
      value={{ showCart, cartItems, showPrice, totalQuantity, qty }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateContext;
