import { createContext, useContext, useState } from 'react';

import gamedata from '../../Data/gamedata.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (id) => {
        const item = gamedata.find(game => game.id === id);
        if (!item) return;  // ถ้าไม่พบสินค้า ให้หยุดทำงาน

        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.id === id);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.id === id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
