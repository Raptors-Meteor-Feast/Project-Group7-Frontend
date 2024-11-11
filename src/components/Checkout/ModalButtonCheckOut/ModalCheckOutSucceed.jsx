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
                    <div className ="flex flex-col gap-1 justify-start items-start">
                    <ModalHeader className='flex'>Modal Title</ModalHeader>
                    </div>

                    <ModalBody>
                    <p> 
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam pulvinar risus non risus hendrerit venenatis.
                        Pellentesque sit amet hendrerit risus, sed porttitor quam.
                    </p>
                    <p>
                        Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                        dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                        Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                        Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                        proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                    </p>
                    </ModalBody>

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