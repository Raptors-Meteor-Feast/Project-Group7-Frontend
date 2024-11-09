import { Input } from "@nextui-org/react";
import { SearchIcon } from "../Images/NavIcon/SearchIcon.jsx";
import { useEffect, useState } from "react";
import gamesDetails from "../gamesDetails.json"


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
            const newFilterData = gamesDetails.filter(items => {
                return items.name.includes(search)
            })
            setSearchData(newFilterData)
            
        }
    }, [search])
  return (
    <div>
        <div>
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
            
        <div>
            { searchData.map((gamesDetails, id) => {
                    return <a href="#" key={id}>{gamesDetails.name}</a>
                } )
            }
            
        </div>
    </div>
  )
}
