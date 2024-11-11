

export default function CheckOutMyCart( {totalPrice} ) {
    // const totalPrice = mockGameData.reduce((sum, item) => sum + item.price, 0);
    
    return (
    <div>
        <div className="flex flex-col w-[265px] h-auto gap-3">
            <h3 className="text-[20px] font-bold">Games and Apps Summary</h3>

            <div className="flex justify-between">
            <p className="font-semibold">Price:</p>
            <p>THB {totalPrice}</p>
            </div>

            <div className="flex justify-between">
            <p className="font-semibold">Taxes:</p>
            <p>Calculated at Checkout</p>
            </div>

            <hr className="w-[265px] border-1 border-black  "/>

            <div className="flex justify-between">
            <p className="font-semibold">Subtotal:</p>
            <p>THB {totalPrice}</p>
            </div> 
            <button className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white p-2 rounded-xl w-[265px]">Check Out</button>
        </div>
    </div>
    )
}
