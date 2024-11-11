import Nav from "../components/Nav"
import MyCart from "../components/Checkout/MyCart";
import CheckOutMyCart from "../components/Checkout/CheckOutMyCart";

export default function CheckOut() {
    return (
    <div className="bg-neutral-950 h-screen text-white p-2">
        <h1 className="mb-5 text-[24px] font-bold mx-48 ">My Cart</h1>
        <div className="flex justify-evenly">
            {/* My cart */}
            <div>
                <MyCart />
                <MyCart />
            </div>
            
            {/* Checkout Summary */}
            <CheckOutMyCart />
        </div>
    </div>
    )
}
