import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';


const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [gameData, setGameData] = useState([]);
    const [success, setSuccess] = useState(false);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/game`);
                setGameData(response.data.game);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);


    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem("authToken");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/checkout`,
                    { headers: { Authorization: `Bearer ${token}` } }, 
                );
                const processedData = Object.entries(response.data.cartData).map(([key, value]) => {
                    // return { id: key, ...value };
                    return { id: key, ...value ,quantity: value.quantity || 1};

                });
                setCart(processedData); // ตั้งค่า cart ด้วยข้อมูลที่ดึงมา
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [success]);

    const addToCart = async (gameDatas) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to add items to the cart.");
            return;
        }
        try {
            const item = gameData.find((game) => game._id === gameDatas._id);
            if (!item) {
                alert("Game not found.");
                return;
            }
    
            const existingItem = cart.find(
                (cartItem) => cartItem.id === gameDatas._id || cartItem.gameId === gameDatas._id  
            );

            if (existingItem) {
                alert( `${gameDatas.title} has already been added to the cart.`);
                return;
            }
    
            const value = {
                gameId: gameDatas._id,
                title: gameDatas.title,
                categories: gameDatas.categories,
                price: gameDatas.price,
                images: gameDatas.images
            };
    
            // เรียก API เพื่อเพิ่มข้อมูลลง backend
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/checkout/add`,value,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            
            // ตรวจสอบสถานะการตอบกลับจาก API
            if (response.status === 200) {
                // setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
                setSuccess(!success);
                // แจ้งเตือนเมื่อเพิ่มสำเร็จ
            alert(`${gameDatas.title} has been added to the cart.`);
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
                `${import.meta.env.VITE_API_BASE_URL}/checkout`,
                { gameId: item.id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // ตรวจสอบสถานะการตอบกลับจาก API
            if (response.status === 200) {
                // setCart([{ ...item, quantity: 1 }]); // ตั้งค่า cart ใหม่
            } else {
                console.error("Failed to checkout.");
            }
        } catch (error) {
            console.error("Error during checkout:", error);
        }
    };


    
    const removeFromCart = async (id) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to remove items from the cart.");
            return;
        }
    
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_API_BASE_URL}/checkout/delete`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    data: { gameId: id, userId: localStorage.getItem("userId") },
                }
            );
    
            if (response.status === 200) {
                // อัปเดต state ของ cart ทันที
                // setCart((prevCart) => prevCart.filter((item) => item._id !== id));
                setSuccess(!success);
                alert("Game removed from cart successfully.");
            } else {
                alert("Failed to remove the game from cart.");
            }
        } catch (error) {
            console.error("Error removing game from cart:", error);
        }
    };

    
    
    

    const clearCart = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please log in to clear the cart.");
            return;
        }
    
        try {
            const response = await axios.patch(
                `${import.meta.env.VITE_API_BASE_URL}/checkout/clear`,
                { userId: localStorage.getItem("userId") },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            if (response.status === 200) {
                setCart([]); // เคลียร์ตะกร้าใน frontend
                alert("Cart cleared successfully.");
            } else {
                alert("Failed to clear the cart.");
            }
        } catch (error) {
            console.error("Error clearing the cart:", error);
        }
    };


    return (
        <CartContext.Provider value={{ cart, removeFromCart, clearCart, loading, error, addToCart, buyNow }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);