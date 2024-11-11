import React from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {RadioGroup, Radio} from "@nextui-org/react";
import ModalCheckOutSucceed from './ModalCheckOutSucceed';

const ModalCheckOut = () => {
        const {isOpen, onOpen, onOpenChange} = useDisclosure();
    
        return (
        <>
        <div>
        <Button onPress={onOpen} color="primary" className='w-full' >Check Out</Button>
        </div>
        

            <Modal 
            backdrop="opaque" 
            isOpen={isOpen} 
            onOpenChange={onOpenChange}
            classNames={{
                backdrop: "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
            }}
            size='5xl'
            >
            <ModalContent className="w-[80vw] h-[80vh]">
                {(onClose) => (
                <div className='w-full h-full p-5'>
                    <ModalHeader className="flex text-[20px] font-bold gap-1">My Cart</ModalHeader>
                    <hr className="w-full border-1 border-black "/>

                    <ModalBody>
                        
                    <div className="flex  justify-between p-5 ">

                    <div className='flex pr-10'>
                        <RadioGroup
                                    label="Select your favorite city"
                                    color="warning"
                                    >
                                        <div className='border border-red-600 bg-slate-500'>
                                        <Radio value="buenos-aires" description="The capital of Argentina">
                                    Promptpay
                                    </Radio>
                                        </div>
                                    <Radio value="buenos-aires" description="The capital of Argentina">
                                    Buenos Aires
                                    </Radio>
                                    <Radio value="canberra" description="The capital of Australia">
                                        Canberra
                                    </Radio>
                                    <Radio value="london" description="The capital of England">
                                        London
                                    </Radio>
                                    <Radio value="tokyo" description="The capital of Japan">
                                        Tokyo
                                    </Radio>
                        </RadioGroup>
                        

                    </div>

                    <div className='flex flex-col gap-5 '>

                    <h3 className="text-[20px] font-bold">Order Summary</h3>

                            <div className="flex">
                            <p className="font-semibold">Price:</p>
                            <p>THB 2,290</p>
                            </div>

                            <div className="flex justify-between">
                            <p className="font-semibold">Taxes:</p>
                            <p>Calculated at Checkout</p>
                            </div>

                            <hr className="w-[265px] border-1 border-black "/>

                            <div className="flex justify-between">
                            <p className="font-semibold">Subtotal:</p>
                            <p>THB 2,290</p>
                            </div> 

                    <ModalCheckOutSucceed />

                    </div>

                        </div>
                        </ModalBody>

                </div>
                )}
            </ModalContent>
            </Modal>
        </>
        );
    }

export default ModalCheckOut