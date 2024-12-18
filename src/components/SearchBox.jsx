import { Input } from "@nextui-org/react";
import { SearchIcon } from "../assets/NavIcon/SearchIcon.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function SearchBox() {
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    useEffect(() => {
        if (search !== "") {
            const fetchSearchResults = async () => {
                try {
                    // ส่งข้อมูล title ไปใน body แทน
                    const response = await axios.post((`${import.meta.env.VITE_API_BASE_URL}/api/game/search`), {
                        title: search,
                    });
                    setSearchData(Array.isArray(response.data.games) ? response.data.games : []);
                } catch (error) {
                    console.error("Error fetching search results:", error);
                }
            };
            fetchSearchResults();
        } else {
            setSearchData([]);
        }
    }, [search]);

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

            {searchData.length > 0 && (<div className="flex justify-center relative">
                <div className="overflow-auto w-[400px] h-[200px] absolute top-1 left-[48%] -translate-x-1/2 z-10">
                {Array.isArray(searchData) && searchData.slice(0, 5).map((gameDatas, id) => (
                        <div key={id}>
                            <Link
                                to={`/game/${gameDatas._id}`} // ลิงก์ไปยังหน้ารายละเอียดเกม
                                className="flex flex-row items-center transition ease-in-out bg-gray-200 gap-2 hover:bg-gray-300 active:bg-gray-400 font-semibold"
                            >
                                <img
                                    src={gameDatas.images[0]}
                                    alt={gameDatas.title}
                                    className="w-[50px] h-[60px] object-cover p-1 ml-2 rounded-lg"
                                />
                                {gameDatas.title}
                            </Link>
                        </div>
                    ))}
                    {Array.isArray(searchData) && searchData.length > 0 && (
                        <div className="bg-gray-200">
                            <p className="font-semibold p-1 ml-2 underline hover:text-blue-500 active:text-blue-700">
                                <Link to="/browse">View more</Link>
                            </p>
                        </div>
                    )}
                </div>
            </div>)}
        </div>
    );
}


