import Nav from "../components/Nav";
import MyCart from "../components/Checkout/MyCart";
import { useCart } from "../components/Checkout/CartContext";
import CheckOutMyCart from "../components/Checkout/CheckOutMyCart";


export default function CheckOut() {
    const { cart, removeFromCart } = useCart();
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div>
            <Nav />
            <div className="bg-neutral-900 h-[100hv] text-white p-2">
                <h1 className="mb-5 text-[24px] font-bold mx-48">My Cart</h1>
                <div className="flex justify-evenly">
                    <div>
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <MyCart
                                    key={item.id}
                                    name={item.title}
                                    image={item.pictureaddress}
                                    price={item.price}
                                    onRemove={() => removeFromCart(item.id)}
                                />
                            ))
                        ) : (
                            <p className="text-[20px] font-semibold">Your cart is empty</p>
                        )}
                    </div>
                    <div>
                        <CheckOutMyCart totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
        </div>

    );
}