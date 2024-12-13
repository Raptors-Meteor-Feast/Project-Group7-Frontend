import { useState, useEffect } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    useDisclosure,
    Input,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const ImagePreview = ({ image, onRemove }) => {
    return (
        <div className="relative">
            <img src={image.preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            <Button
                onPress={onRemove}
                size="sm"
                className="absolute top-0 right-0"
                color="danger"
            >
                Remove
            </Button>
        </div>
    );
};

const ModalCheckOutSucceed = ({ disabled, onSubmitOrder, orderId }) => {
    console.log("Received orderId:", orderId);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [images, setImages] = useState([]);
    const [userData, setUserData] = useState(null);
    const [logIn, setLogIn] = useState(false);

    const API_URL = import.meta.env.VITE_API_BASE_URL;

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);

        toast.success("Images added successfully!");
    };

    const handleRemoveImage = (imageToRemove) => {
        setImages((prevImages) =>
            prevImages.filter((image) => image.preview !== imageToRemove.preview)
        );
        toast.info("Image removed.");
    };

    const handleClearImages = () => {
        images.forEach((image) => URL.revokeObjectURL(image.preview));
        setImages([]);
        toast.warning("All images cleared.");
    };

    useEffect(() => {
        return () => {
            images.forEach((image) => URL.revokeObjectURL(image.preview));
        };
    }, [images]);

    const fetchData = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            setLogIn(false);
            return;
        }

        try {
            const parsedToken = JSON.parse(atob(token.split(".")[1]));
            setLogIn(!!parsedToken);

            if (parsedToken && !userData) {
                const response = await axios.get(`${API_URL}/user/data`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
            }
        } catch (error) {
            console.error("Error processing token or fetching data:", error);
            localStorage.removeItem("authToken");
            setLogIn(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [userData]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("authToken");

        if (!orderId) {
            toast.error("Order ID is missing. Cannot upload receipt.");
            return;
        }

        if (images.length === 0) {
            toast.error("Please select at least one image.");
            return;
        }

        const formData = new FormData();
        images.forEach((image) => {
            formData.append("files", image.file);
        });

        try {
            const response = await axios.post(`${API_URL}/orders/${orderId}/receipt`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Receipt uploaded successfully!");
            handleClearImages();
            return response.data;
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Server error, please try again later"
            );
        }
    };

    return (
        <>
            <Button
                onPress={() => {
                    onSubmitOrder && onSubmitOrder();
                    onOpen();
                }}
                isDisabled={disabled}
                color="primary"
                className="hover: transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white] font-bold"
            >
                PURCHASE
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="5xl"
                classNames={{
                    backdrop: "bg-black",
                }}
                className="bg-zinc-900 text-white custom-modal"
            >
                <ModalContent>
                    <div className="flex flex-col items-center p-3">
                        <img
                            className="w-2/3 sm:w-[40%] hover:scale-110 ease-in-out duration-300"
                            src="/Images/ProjectLogo/WebLogo.svg"
                            alt="logo"
                        />
                        <ModalHeader className="flex justify-start">
                            Raptors Meteor Feast
                        </ModalHeader>
                        <ModalBody className="flex flex-col items-center justify-center">
                            <h1 className="text-3xl">Thank you! Code sent to your email</h1>
                            <p>If you have slipped, please upload your slip</p>

                            <form onSubmit={handleFormSubmit} className="mt-4">
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    aria-label="Upload your images"
                                    multiple
                                />

                                {images.length > 0 && (
                                    <div className="mt-4">
                                        <h3 className="text-lg">Selected Images:</h3>
                                        <div className="flex gap-4 flex-wrap">
                                            {images.map((image, index) => (
                                                <ImagePreview
                                                    key={index}
                                                    image={image}
                                                    onRemove={() => handleRemoveImage(image)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex flex-col gap-2 mt-2">
                                    <Button type="submit" color="success">
                                        Upload Images
                                    </Button>
                                    <Button
                                        onPress={handleClearImages}
                                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                    >
                                        Clear All Images
                                    </Button>
                                    <Link to="/">
                                        <Button onPress={onClose} color="primary" className="w-full">
                                            Next
                                        </Button>
                                    </Link>
                                </div>
                            </form>
                        </ModalBody>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCheckOutSucceed;
