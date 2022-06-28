import React from "react";
import toast, { Toast } from "react-hot-toast";
import { Product as IProduct } from "../sanity_maker-ecommerce/schema";
import { usePaystackPayment } from "react-paystack";
interface Props {
  children: React.ReactNode;
}

interface CartProduct extends IProduct {
  quantity?: number;
}

interface ContextInterface {
  showCart: boolean;
  cartItems: CartProduct[];
  totalQuantity: number;
  onAdd: (product: CartProduct, quantity: number) => void;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  totalPrice: number;
  toggleCartItemQuantity: (id: string, value: string) => void;
  onRemove: (product: CartProduct) => void;
  resetCart: () => void;
}

const Context = React.createContext<ContextInterface | null>(null);

const StateContext = ({ children }: Props) => {
  const [showCart, setShowCart] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartProduct[] | []>([]);
  const [totalQuantity, setTotalQuantity] = React.useState(0);
  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    console.log("state effect call");
  }, []);

  let foundProduct: CartProduct;

  function onRemove(product: CartProduct) {
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setCartItems(newCartItems);
    setTotalPrice(
      (prevPrice) => prevPrice - product.price! * product.quantity!
    );
    setTotalQuantity((total) => total - product.quantity!);
  }

  function resetCart() {
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantity(0);
  }

  function toggleCartItemQuantity(id: string, value: string) {
    foundProduct = cartItems.find((item) => item._id === id)!;
    let updatedCartItems: CartProduct[] = [];
    if (value == "inc") {
      updatedCartItems = cartItems.map((item) => {
        if (item._id === id)
          return { ...item, quantity: (item.quantity! += 1) };
        return item;
      });
      setTotalPrice((prevTotal) => prevTotal + foundProduct.price!);
      setTotalQuantity((prevTotal) => prevTotal + 1);
    } else if (value == "desc") {
      if (foundProduct.quantity! > 1) {
        updatedCartItems = cartItems.map((item) => {
          if (item._id === id)
            return {
              ...item,
              quantity: item.quantity! > 1 ? (item.quantity! -= 1) : 1,
            };
          return item;
        });
        setTotalPrice((prevTotal) => prevTotal - foundProduct.price!);
        setTotalQuantity((prevTotal) => prevTotal - 1);
      }
    }
    setCartItems(updatedCartItems.length ? updatedCartItems : cartItems);
  }

  function onAdd(product: CartProduct, quantity: number) {
    const isProductInCart = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotal) => prevTotal + product!.price! * quantity);
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
        totalQuantity,
        onAdd,
        totalPrice,
        toggleCartItemQuantity,
        onRemove,
        resetCart,
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
