import { useState } from "react";
import ModalCheckOut from "./ModalButtonCheckOut/ModalCheckOut";


export default function CheckOutMyCart({ totalPrice }) {

  const [isModalOpen, setModalOpen] = useState(false);

  const handleCheckout = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <div className="flex flex-col w-[400px] h-auto gap-3 rounded-lg p-4 bg-neutral-800 [box-shadow:_0_0_10px_white,_0_0_20px_white]">
        <h3 className="text-[20px] font-bold">Games and Apps Summary</h3>

        <div className="flex justify-between">
          <p className="font-semibold">Price</p>
          <p>THB {totalPrice}</p>
        </div>

        <div className="flex justify-between">
          <p className="font-semibold">Taxes</p>
          <p>Calculated at Checkout</p>
        </div>

        <hr className="w-[370px] border-1 border-black  " />

        <div className="flex justify-between text-xl font-semibold">
          <p >TOTAL</p>
          <p >THB {totalPrice}</p>
        </div>

        <ModalCheckOut
          totalPrice={totalPrice}
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
}
