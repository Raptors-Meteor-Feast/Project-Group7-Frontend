import Nav from "../components/Nav";
import MyCart from "../components/Checkout/MyCart";
import { useCart } from "../components/Checkout/CartContext";
import CheckOutMyCart from "../components/Checkout/CheckOutMyCart";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { IoTrashOutline } from "react-icons/io5";



export default function CheckOut() {
    const { cart, removeFromCart, clearCart } = useCart();
    console.log("bank",cart)
    // const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // const [cartData, setCartData] = useState([cart.cartData]) 
    return (
        <div>
            <Nav />
            <div className="bg-neutral-900 min-h-screen text-white p-2">
                <h1 className="mb-5 text-[24px] font-bold mx-48 text-center md:text-left">My Cart</h1>
                <div className="flex-wrap md:flex justify-evenly">
                    <div>
                        { cart.length > 0 ? (
                            cart.map((item) => (
                                <MyCart
                                    key={item.id? item.id:""}
                                    name={item.title? item.title:""}
                                    image={item.images? item.images:""}
                                    price={item.price? item.price:""}
                                    category={item.categories? item.categories:""}
                                    onRemove={() => removeFromCart(item?.id)}
                                />
                            ))
                        ) : (
                            <p className="text-[20px] font-semibold text-center">Your cart is empty</p>
                        )}
                        {cart.length > 0 && (
                    <button className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white p-2 rounded-full flex gap-2 items-center justify-center w-[120px] h-[40px] mt-5 mb-10 mx-auto md:mx-0" onClick={() => clearCart()}>
                        <IoTrashOutline size={20} style={{ color: 'white' }} /> Clear Cart
                    </button>
                    )}
                    </div>
                    <div className="flex justify-center mt-20 md:mt-0">
                        {/* <CheckOutMyCart totalPrice={totalPrice} /> */}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}



