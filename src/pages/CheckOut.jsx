import Nav from "../components/Nav";
import MyCart from "../components/Checkout/MyCart";
import { useCart } from "../components/Checkout/CartContext";
import CheckOutMyCart from "../components/Checkout/CheckOutMyCart";
import Footer from "../components/Footer/Footer";
import { IoTrashOutline } from "react-icons/io5";



export default function CheckOut() {
    const { cart, removeFromCart, clearCart } = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
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
                                    key={item.id}
                                    name={item.title}
                                    image={item.images[0]}
                                    price={item.price}
                                    category={item.categories}
                                    onRemove={() => removeFromCart(item.id)}
                                />
                            ))
                        ) : (
                            <p className="text-[20px] font-semibold text-center">Your cart is empty</p>
                        )}
                        {cart.length > 0 && (
                    <button className="bg-red-500 hover:bg-black border-2 hover:border-red-600 active:bg-red-700transform transition-all duration-300 text-white p-2 rounded-full flex gap-2 items-center justify-center w-[170px] h-[40px] mt-5 mb-10 mx-auto md:mx-0" onClick={() => clearCart()}>
                        <IoTrashOutline size={20} style={{ color: 'white' }} /> Clear Cart
                    </button>
                    )}
                    </div>
                    <div className="flex justify-center mt-20 md:mt-0">
                        <CheckOutMyCart totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}



