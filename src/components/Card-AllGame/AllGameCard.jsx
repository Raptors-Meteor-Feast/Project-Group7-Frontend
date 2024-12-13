import React, { useState, useEffect } from "react";
import { Card, CardBody, Image, CardFooter, Pagination } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const AllGameCard = ({ selectedCategory }) => {
    const navigate = useNavigate();
    const [gameData, setGameData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;


    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/game`);
            setGameData(response.data.game);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);

    const handleCardClick = (id) => {
        navigate(`/game/${id}`);
    };

    const filteredGames = selectedCategory
        ? gameData.filter((game) => game.categories.includes(selectedCategory))
        : gameData;

    const totalItems = filteredGames.length;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGames = filteredGames.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="w-full px-[250px] bg-neutral-900 pb-[60px]">
            <div className="gap-[22px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {currentGames.map((game) => (
                    <Card
                        shadow="md"
                        key={game._id}
                        isPressable
                        onPress={() => handleCardClick(game._id)}
                        className="drop-shadow-md hover:bg-gray-300 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
                    >
                        <CardBody className="overflow-visible p-0">
                            <Image
                                shadow="sm"
                                radius="lg"
                                width="100%"
                                isBlurred
                                alt={game.title}
                                className="w-full object-cover h-[230px]"
                                src={game.images[0]}
                            />
                        </CardBody>
                        <CardFooter className="text-small flex flex-col justify-start items-start">
                            <div className="flex justify-start gap-2">
                                <p className="text-[12px] text-default-700">{game.categories[0]}</p>
                                <p className="text-[12px] text-default-700">{game.categories[1]}</p>
                            </div>
                            <b className='text-[16px] text-gray-800 text-ellipsis whitespace-nowrap overflow-hidden w-[100%] text-start'>{game.title}</b>
                            {game.price === 0 ? (
                                <p className="text-[12px] text-default-800">
                                    <span>Free to Play</span>
                                </p>
                            ) : (
                                <p className="text-[12px] text-default-800">
                                    THB <span>{game.price}</span>
                                </p>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <Pagination
                    total={Math.ceil(totalItems / itemsPerPage)}
                    initialPage={1}
                    color="danger"
                    page={currentPage}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AllGameCard;
