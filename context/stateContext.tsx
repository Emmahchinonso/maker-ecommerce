import React from "react";
import toast, { Toast } from "react-hot-toast";
import { Product as IProduct } from "../sanity_maker-ecommerce/schema";

interface Props {
  children: React.ReactNode;
}

interface CartProduct extends IProduct {
  quantity?: number;
}

interface ContextInterface {
  showCart: boolean;
  cartItems: CartProduct[];
  showPrice: boolean;
  totalQuantity: number;
  onAdd: (product: CartProduct, quantity: number) => void;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
}

const Context = React.createContext<ContextInterface | null>(null);

const StateContext = ({ children }: Props) => {
  const [showCart, setShowCart] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartProduct[] | []>([]);
  const [showPrice, setShowPrice] = React.useState(false);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  function onAdd(product: CartProduct, quantity: number) {
    const isProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotal) => prevTotal + (product.price || 0) * quantity);
    setTotalQuantity((prevTotal) => prevTotal + quantity);
    let updatedCartItems = [];

    if (isProductInCart) {
      updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product?._id)
          return { ...cartProduct, quantity: cartProduct.quantity! + quantity };
        return cartProduct;
      });
    } else {
      product.quantity = quantity;
      updatedCartItems = [...cartItems, { ...product }];
    }

    toast.success(`${quantity} ${product.name} hoodie(s) added to the cart.`);
    setCartItems(updatedCartItems);
  }

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        showPrice,
        totalQuantity,
        onAdd,
        totalPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => {
  const value = React.useContext(Context);

  if (!value)
    throw new Error("useStateContext must be used withing StateContext");

  return value;
};

export default StateContext;
