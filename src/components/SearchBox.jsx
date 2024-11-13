import { Input } from "@nextui-org/react";
import { SearchIcon } from "../Images/NavIcon/SearchIcon.jsx";
import { useEffect, useState } from "react";
import gamedata from '../Data/gamedata.json'
import { Link } from "react-router-dom";



export default function SearchBox() {
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])


    const handleChange = (e) => {
        setSearch(e.target.value);
    }


    useEffect(() => {
        if(search !== "") {
            const newData = gamedata.filter(data => {
                return data.title.toLowerCase().includes(search.toLowerCase())
            })
            setSearchData(newData)
        } else {
            setSearchData([]);
        }
    }, [search])

return (
    <div>
        <div className="flex justify-center">
        <Input
        classNames={{
            base: "max-w-full mr-6 sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
            "h-full w-[300px] font-normal text-default-500 bg-default-100/70 dark:bg-default-500/20 rounded-3xl",
        }}
        placeholder="Type to search..."
        size="sm"
        startContent={<SearchIcon size={18} />}
        type="search"
        onChange={handleChange}
        value={search}
        />
        </div>
        
        <div className="flex justify-center relative">
        <div className="overflow-auto w-[400px] h-[200px] absolute top-1 left-[48%] -translate-x-1/2 z-10 ">
            { searchData.slice(0,5).map((data, id) => {
            return <div key={id}>
                    <Link to={`card/${data.id}`} key={id} className="flex flex-row items-center transition ease-in-out bg-gray-200 gap-2 hover:bg-gray-300 active:bg-gray-400 font-semibold"> 
                    <img src={data.pictureaddress} alt={data.title} className="w-[50px] h-[60px] object-cover p-1 ml-2 rounded-lg " />{data.title}</Link>
                    </div>
            })}
            {searchData.length > 5 && (
                <div className="bg-gray-200">
                    <p className="font-semibold p-1 ml-2 underline hover:text-blue-500 active:text-blue-700">
                        <Link to="/browse">View more</Link>
                    </p>
                </div>
            )}
        </div>
        </div>
    </div>
)
}
