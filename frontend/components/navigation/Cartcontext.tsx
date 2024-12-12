//create 8.47
import { createContext } from "react";
import { useState, useContext } from 'react';

type CartItems = {
    [key:string]: number;
}
type CartContextType = {
cartItems: CartItems;
    addToCart: (itemkey: string, quantity: number) => void;
    setQuantity: (itemkey: string, quantity: number) => void; 
    emptyCart: () => void;
}

// ham tinh tien
const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: React. ReactNode}) => { 
    const [cartItems, setCartItems] = useState <CartItems>({});

    const addToCart = (itemkey: string, quantity: number) => { 
        setCartItems((prevCartItems) => {
            return {
                ...prevCartItems,
                [itemkey]: (prevCartItems[itemkey] || 0) + quantity,
            }   
        });
    }

    const setQuantityCart = (itemkey: string, delat: number) => { 
        setCartItems((prevCartItems) => {
            return {
                ...prevCartItems,
                [itemkey]: Math.max((prevCartItems[itemkey] || 0) + delat,0),
            }
        }),
    }

    const emptyCart = () => {
        setCartItems({});
    }
    
    return (
        <CartContext.Provider value={{cartItems, addToCart, setQuantityCart, emptyCart}}>
            {children}
    </CartContext.Provider>
    );
}

export const useCart(): CartContextType => { 
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a Cart Provider');
    }
    return context;
}