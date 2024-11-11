import Nav from "../components/Nav"
import MyCart from "../components/Checkout/MyCart";
import CheckOutMyCart from "../components/Checkout/CheckOutMyCart";


export default function CheckOut() {
    const mockGameData = [
        {
            id: 1,
            name: "God of War Ragnarok",
            category: "Action",
            edition: "Standard",
            src: "src/assets/GameCoverImg/God of war cover.jpg",
            price: 2290
        },
        {
            id: 2,
            name: "The Last of Us",
            category: "Adventure",
            edition: "Standard",
            src: "data:image/jpeg;base64,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",
            price: 2290
        },
        {
            id: 3,
            name: "Resident Evil 4 Remake",
            category: "Adventure",
            edition: "Gold",
            src: "https://www.gamesrig.com/img/index/resident-evil-4-gold-edition-cover.jpg",
            price: 3450
        },
        {
            id: 4,
            name: "Call of Duty: Black Ops 6",
            category: "Shooting",
            edition: "Vault",
            src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5QSwhTrKU0NZUfj4IFkC4CHvKhvbzlrJsch8O202wjQH3atKYMyLQ1wPp4T171KV1xJU&usqp=CAU",
            price: 3500
        },
        
    ]

    const totalPrice = mockGameData.reduce((sum, item) => sum + item.price , 0)

    return (
    <div>
        <h1 className="mb-5 text-[24px] font-bold mx-48 mt-14">My Cart</h1>
        <div className="flex justify-evenly">
            {/* My cart */}
            <div>
                {mockGameData.length > 0 ? (
                    mockGameData.map(items => (
                        <MyCart key={items.id} name={items.name} category={items.category} edition={items.edition} image={items.src} price={items.price} />
                    ))
                ) : (
                    <p className="text-[20px] font-semibold">Your cart is empty</p>
                )}
            </div>
            
            {/* Checkout Summary */}
            <CheckOutMyCart totalPrice={totalPrice} />
        </div>
    </div>
    )
}



