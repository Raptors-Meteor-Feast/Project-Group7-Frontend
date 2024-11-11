import { Input } from "@nextui-org/react";
import { SearchIcon } from "../Images/NavIcon/SearchIcon.jsx";
import { useEffect, useState } from "react";
import gamedata from '../Data/gamedata.json'


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
            return <a href={`card/${data.id}`} key={id} className="flex flex-row items-center bg-gray-200 gap-2 hover:bg-gray-300 active:bg-gray-400" target="_blank"> 
            <img src={data.pictureaddress} alt={data.title} className="w-[50px] h-[60px] object-cover p-1 ml-2" />{data.title}</a>
            })}
        </div>
        </div>
    </div>
)
}
