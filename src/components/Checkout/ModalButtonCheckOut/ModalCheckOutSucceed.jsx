import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";


const ModalCheckOutSucceed = () => {
        const {isOpen, onOpen, onOpenChange} = useDisclosure();

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
            >
            <ModalContent>
                {(onClose) => (

                    
                <div className='flex flex-col items-center p-3'>

                    <div className='flex justify-center items-center'>
                    <img className='w-2/3 sm:w-[40%]' src="src/assets/ProjectLogo/Logo-7.svg" alt="logo" />
                    </div>

                    <div className ="flex flex-col gap-1 justify-start items-start">
                    <ModalHeader className='flex'>Raptors Meteor Feast</ModalHeader>
                    </div>

                    <div>
                    <ModalBody className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl'>
                        Thank you!
                    </h1>
                    <p>
                        Code sent to your email
                    </p>
                    <p>
                        Please do not close the window until we confirm your purchase is complete.
                    </p>
                    </ModalBody>
                    </div>

                <div>
                <a href="/"><Button onPress={onClose} color="primary" className=''>OK</Button></a>
                </div>
            
                </div>
                )}
            </ModalContent>
            </Modal>
        </>
        );
    }
export default ModalCheckOutSucceed;