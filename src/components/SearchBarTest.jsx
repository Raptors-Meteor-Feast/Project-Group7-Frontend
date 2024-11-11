import { Input } from "@nextui-org/react";
import { SearchIcon } from "../Images/NavIcon/SearchIcon.jsx";
import { useEffect, useState } from "react";


export default function SearchBarTest() {
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])
    const [selectedItem, setSelectedItem] = useState(-1)

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    const handleKeyDown = (e) => {
        if(selectedItem < searchData.length) {
            if(e.key === "ArrowUp" && selectedItem >0) {
                setSelectedItem(prev => prev - 1)
            } else if (e.key === "ArrowDown" && selectedItem < searchData.length - 1) {
                setSelectedItem(prev => prev + 1)
            } else if(e.key === "Enter" && selectedItem >=0) {
                window.open(searchData[selectedItem])
            }
        } else {
            setSelectedItem (-1)
        }
        
    } 

    useEffect(() => {
        if(search !== "") {
            fetch(`http://api.tvmaze.com/search/shows?q=${search}`)
            .then((res) => res.json())
            .then((data) => setSearchData(data));
        }
    }, [search])

  return (
    <div>
        <div className="flex justify-center bg-gray-500 p-4">
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
        onKeyDown={handleKeyDown}
        />
        </div>
        
        <div className="flex justify-center">
        <div className="overflow-auto w-[300px] h-[200px]">
            { searchData.map((data, id) => {
            return <a href={data.show.url} key={id} className="flex flexcol" target="_blank">{data.show.name}</a>
            })}
        </div>
        </div>
    </div>
  )
}
