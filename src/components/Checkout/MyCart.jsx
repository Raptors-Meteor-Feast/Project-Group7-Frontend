import { IoTrashOutline } from "react-icons/io5";

export default function MyCart({name, category, edition, image, price}) {
  return (
    <div>
        <div className="flex justify-between w-[873px] h-[196px] p-[24px] bg-slate-300 rounded-lg mb-8">
            <div className="flex gap-5">
                <div>
                    <img
                    className="w-[100px] h-auto object-cover"
                    src={image} alt={name} />
                </div>
                <div>
                    <p className="bg-slate-200 rounded-full w-[100px] mb-3 text-center">{category}</p>
                    <p className="font-semibold">{name}</p>
                    <p className="font-semibold">{edition} Edition</p>
                </div>
            </div>
            <div className="flex flex-col justify-between items-end"> 
                <p className="font-semibold">THB {price}</p>
                <button className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white p-2 rounded-full flex gap-2 items-center justify-center w-[120px]" >
                <IoTrashOutline size={20} style={{ color: 'white' }} /> Remove </button>
            </div>
        </div>
    </div>
  )
}
