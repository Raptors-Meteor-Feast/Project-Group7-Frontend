import { Input } from "@nextui-org/react";
import { SearchIcon } from "../Images/NavIcon/SearchIcon.jsx";
import { useEffect, useState } from "react";



export default function SearchBox() {
    const [search, setSearch] = useState("")
    const [searchData, setSearchData] = useState([])
   

    const handleChange = (e) => {
        setSearch(e.target.value);
    }


    useEffect(() => {
        if(search !== "") {
            fetch(`https://www.moogleapi.com/api/v1/characters`)
            .then((res) => res.json())
            .then((data) => setSearchData(data));
        }
    }, [search])
  return (
    <div>
        <div>
        <Input
        placeholder="Type to search..."
        type="search"
        onChange={handleChange}
        value={search}
        />
        </div>
            
        <div className="overflow-auto w-[300px] h-[200px]">
            { searchData.map((data, id) => {
                    return <a href={data.url} key={id} className="flex flexcol">{data.name}, {data.race}, {data.origin}</a>
                } )
            }    
        </div>
    </div>
  )
}