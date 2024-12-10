import { createContext, useContext, useState } from 'react';

import gamedata from '../../Data/gamedata.json';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (id) => {
        const item = gamedata.find(game => game.id === id);
        if (!item) return;  // ถ้าไม่พบสินค้า ให้หยุดทำงาน

        // เช็คว่าเกมนี้เคยถูกเพิ่มลงตะกร้าหรือยัง
        const existingItem = cart.find(cartItem => cartItem.id === id);

        if (existingItem) {
            alert('The game has been added to the cart.'); // แจ้งเตือนเมื่อเกมถูกเพิ่มซ้ำ
            return;
        }

        setCart(prevCart => [
            ...prevCart,
            { ...item, quantity: 1 },
        ]);
    };

    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    const buyNow = (item) => {
        setCart([{ ...item, quantity: 1 }]); // Replace cart with the current item
    };

    // ฟังก์ชันใหม่สำหรับเคลียร์ตะกร้า
    const clearCart = () => {
        setCart([]); // รีเซ็ต cart ให้เป็นอาเรย์ว่าง
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart , buyNow, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

