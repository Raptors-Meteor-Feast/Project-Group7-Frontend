import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameData, setGameData] = useState([]);
    

    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(
                    "http://localhost:4000/api/checkout",
                    { headers: { Authorization: `Bearer ${token}` } },
                    
                );
                const processedData = Object.entries(response.data.cartData).map(([key, value]) => {
                    return { id: key, ...value };
                });
                setCart(processedData); // ตั้งค่า cart ด้วยข้อมูลที่ดึงมา
                // console.log("sunday",response.data)
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const addToCart = async (gameDatas) => {
        console.log(gameDatas)
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to add items to the cart.");
            return;
        }
    
        try {
            const item = gameData.find((game) => game._id === gameId);
            console.log(item)
            if (!item) {
                alert("Game not found.");
                return;
            }
    
            const existingItem = cart.find((cartItem) => cartItem._id === gameId);
            if (existingItem) {
                alert("The game has already been added to the cart.");
                return;
            }
    
            // เรียก API เพื่อเพิ่มข้อมูลลง backend
            const response = await axios.post(
                "http://localhost:4000/api/checkout/add",
                { headers: { Authorization: `Bearer ${token}` } },
                { gameId, title, categories, price, images }
            );
    
            // ตรวจสอบสถานะการตอบกลับจาก API
            if (response.status === 200) {
                setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
            } else {
                console.error("Failed to add item to cart.");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };


    const buyNow = async (item) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to purchase items.");
            return;
        }
    
        try {
            // เรียก API เพื่อดำเนินการ checkout
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/cart/checkout`,
                { gameId: item.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // ตรวจสอบสถานะการตอบกลับจาก API
            if (response.status === 200) {
                setCart([{ ...item, quantity: 1 }]); // ตั้งค่า cart ใหม่
            } else {
                console.error("Failed to checkout.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };


    const removeFromCart = (id) => {
        setCart(prevCart => prevCart.filter(item => item._id !== id));
    };

    const clearCart = () => {
        setCart([]); // เคลียร์ตะกร้า
    };

    return (
        <CartContext.Provider value={{ cart, removeFromCart, clearCart, loading, error, addToCart, buyNow }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);