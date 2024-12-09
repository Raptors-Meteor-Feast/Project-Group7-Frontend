import Nav from "../components/Nav";
import MyCart from "../components/Checkout/MyCart";
import { useCart } from "../components/Checkout/CartContext";
import CheckOutMyCart from "../components/Checkout/CheckOutMyCart";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import { IoTrashOutline } from "react-icons/io5";

// export default function CheckOut() {
//   const [gameData, setGameData] = useState(null);
//   useEffect(() => {
//     const cartList = localStorage.getItem("cartList");

//     if (cartList) {
//       setGameData((prev) => {
//         const updateGameData = [...JSON.parse(cartList)];
//         return updateGameData;
//       });
//     }
//   }, []);

//   const removeCartListByIndex = (index) => {
//     const updatedData = [...gameData];
//     updatedData.splice(index, 1);

//     localStorage.setItem("cartList", JSON.stringify(updatedData));
//     setGameData(updatedData);
//   };

//   const totalPrice = gameData
//     ? gameData.reduce((sum, item) => sum + item.price, 0)
//     : 0;

//   return (
//     <div className="h-[100vh]">
//       <Nav cartItem={gameData} />
//       <div className="bg-neutral-900 h-full text-white p-2 ">
//         <h1 className="mb-5 text-[24px] font-bold mx-48 ">My Cart</h1>
//         <div className="flex justify-evenly">
//           {/* My cart */}
//           <div>
//             {gameData && gameData.length > 0 ? (
//               gameData.map((items, index) => (
//                 <MyCart
//                   key={index}
//                   name={items.title}
//                   category={items.categories[0]}
//                   edition={items.edition}
//                   image={items.pictureaddress}
//                   price={items.price}
//                   action={() => removeCartListByIndex(index)}
//                 />
//               ))
//             ) : (
//               <p className="text-[20px] font-semibold">Your cart is empty</p>
//             )}
//           </div>

//           <CheckOutMyCart totalPrice={totalPrice} />
//         </div>
//       </div>
//     </div>
//   );
// }


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
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <MyCart
                                    key={item.id}
                                    name={item.title}
                                    image={item.pictureaddress}
                                    price={item.price}
                                    category={item.categories}
                                    onRemove={() => removeFromCart(item.id)}
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
                        <CheckOutMyCart totalPrice={totalPrice} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

