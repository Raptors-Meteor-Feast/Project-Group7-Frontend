import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, useDisclosure } from "@nextui-org/react";

const ModalCheckOutSucceed = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen} color="primary">Open Modal</Button>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                size='5xl'
                classNames={{
                    backdrop: "bg-black"
                }}
                className='bg-stone-800 text-white'
            >
                <ModalContent>
                    {onClose => (
                        <div className='flex flex-col items-center p-3'>
                            <img className='w-2/3 sm:w-[40%]' src="src/assets/ProjectLogo/Logo-7.svg" alt="logo" />
                            <ModalHeader className='flex justify-start'>Raptors Meteor Feast</ModalHeader>
                            <ModalBody className='flex flex-col items-center justify-center'>
                                <h1 className='text-3xl'>Thank you!</h1>
                                <p>Code sent to your email</p>
                                <p>Please do not close the window until we confirm your purchase is complete.</p>
                            </ModalBody>
                            <a href="/"><Button onPress={onClose} color="primary">OK</Button></a>
                        </div>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCheckOutSucceed;