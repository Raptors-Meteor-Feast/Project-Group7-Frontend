import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";
import { Link } from 'react-router-dom'; 

const ModalCheckOutSucceed = ({disabled}) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} isDisabled={disabled} color="primary">Purchase</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size='5xl'
                classNames={{
                    backdrop: "bg-black"
                }}
                className='bg-zinc-900 text-white'
            >
                <ModalContent>
                    {onClose => (
                        <div className='flex flex-col items-center p-3'>
                            <img className='w-2/3 sm:w-[40%]' src="Images/ProjectLogo/WebLogo.svg" alt="logo" />
                            <ModalHeader className='flex justify-start'>Raptors Meteor Feast</ModalHeader>
                            <ModalBody className='flex flex-col items-center justify-center'>
                                <h1 className='text-3xl'>Thank you!</h1>
                                <p>Code sent to your email</p>
                            </ModalBody>
                        
                            <Link to="/">
                            <Button onPress={onClose} color="primary">OK</Button>
                        </Link>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCheckOutSucceed;