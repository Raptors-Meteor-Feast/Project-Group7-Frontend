import React, { useState, useEffect } from "react";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function Filter({ setSelectedCategory }) {
    const [categories, setCategories] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState(new Set());

    const selectedValue = React.useMemo(() => {
        const selectedCategory = Array.from(selectedKeys).join(", ").replace(/_/g, "");
        return selectedCategory || "Categories";
    }, [selectedKeys]);

    useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/game`);
            const games = response.data.game;

            const uniqueCategories = [
                ...new Set(games.flatMap((game) => game.categories)),
            ];
            setCategories(uniqueCategories);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

        fetchData();
    }, []);

    useEffect(() => {
        const selectedCategory = Array.from(selectedKeys).join(", ");
        setSelectedCategory(selectedCategory);
    }, [selectedKeys, setSelectedCategory]);

    return (
        <div className="bg-neutral-900 px-[250px] py-5">
            <Dropdown>
                <DropdownTrigger>
                    <Button className="capitalize" variant="bordered">
                        {selectedKeys.size ? Array.from(selectedKeys).join(", ") : "Categories"}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu
                    disallowEmptySelection
                    aria-label="Single selection example"
                    selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={setSelectedKeys}
                >
                    {categories.map((category) => (
                        <DropdownItem key={category}>
                            {category}
                        </DropdownItem>
                    ))}
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default Filter;
