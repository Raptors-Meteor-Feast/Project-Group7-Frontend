import { useState, useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure, Input } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ImagePreview = ({ image, onRemove }) => {
    return (
        <div className="relative">
            <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded" />
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

const ModalCheckOutSucceed = ({ disabled, onSubmitOrder }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => URL.createObjectURL(file));
        setImages(prevImages => [...prevImages, ...newImages]);

        toast.success("Images uploaded successfully!");
    };

    const handleRemoveImage = (imageToRemove) => {
        setImages((prevImages) => prevImages.filter(image => image !== imageToRemove));
        toast.info("Image removed.");
    };

    const handleClearImages = () => {
        setImages([]);
        toast.warning("All images cleared.");
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (images.length > 0) {
            console.log("Images uploaded:", images);
        } else {
            toast.error("Please select at least one image.");
        }
    };

    useEffect(() => {
        return () => {
            images.forEach(image => URL.revokeObjectURL(image));
        };
    }, [images]);

    return (
        <>
            <Button onPress={() => { onSubmitOrder && onSubmitOrder(); onOpen(); }} isDisabled={disabled} color="primary"
                className='hover: transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white] font-bold'>PURCHASE</Button>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="5xl"
                classNames={{
                    backdrop: "bg-black"
                }}
                className="bg-zinc-900 text-white custom-modal"
            >
                <ModalContent>
                    <div className="flex flex-col items-center p-3">
                        <img className="w-2/3 sm:w-[40%] hover:scale-110 ease-in-out duration-300" src="/Images/ProjectLogo/WebLogo.svg" alt="logo" />
                        <ModalHeader className="flex justify-start">Raptors Meteor Feast</ModalHeader>
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
                                    <Button type="submit" color="success">Upload Images</Button>
                                    <Button
                                        onPress={handleClearImages}
                                        className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
                                    >
                                        Clear All Images
                                    </Button>
                                    <Link to="/">
                                        <Button onPress={onClose} color="primary" className="w-full">Next</Button>
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
