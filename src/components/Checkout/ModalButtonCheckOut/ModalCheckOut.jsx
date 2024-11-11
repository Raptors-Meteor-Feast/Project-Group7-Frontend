    import React from "react";
    import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Button,
    } from "@nextui-org/react";
    import { RadioGroup, Radio } from "@nextui-org/react";
    import ModalCheckOutSucceed from "./ModalCheckOutSucceed";

    const ModalCheckOut = ({ totalPrice }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <>
        <Button
            onPress={() => setIsOpen(true)}
            color="primary"
            className="w-full"
        >
            Check Out
        </Button>
        <Modal
            backdrop="opaque"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            size="5xl"
            className="bg-stone-800 text-white"
        >
            <ModalContent className="w-[80vw] h-[80vh]">
            <ModalHeader className="flex text-[20px] font-bold gap-1">
                My Cart
            </ModalHeader>
            <hr className="w-full border-1 border-black " />

            <ModalBody>
                <div className="flex  justify-between p-5 ">
                <div className="flex pr-10">
                    <RadioGroup label="Select your favorite city" color="warning">
                    <div className="">
                        <Radio
                        value="promptpay"
                        description="The capital of Argentina"
                        className="text-white"
                        >
                        Promptpay
                        </Radio>
                    </div>

                    <Radio
                        value="canberra"
                        description="The capital of Australia"
                    >
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

                <div className="flex flex-col gap-5 ">
                    <h3 className="text-[20px] font-bold">Order Summary</h3>

                    <div className="flex justify-between">
                    <p className="font-semibold">Price:</p>
                    <p>THB {totalPrice}</p>
                    </div>

                    <div className="flex justify-between">
                    <p className="font-semibold">Taxes:</p>
                    <p>Calculated at Checkout</p>
                    </div>

                    <hr className="w-[265px] border-1 border-black  " />

                    <div className="flex justify-between">
                    <p className="font-semibold">Subtotal:</p>
                    <p>THB {totalPrice}</p>
                    </div>
                    <ModalCheckOutSucceed />
                </div>
                </div>
            </ModalBody>
            </ModalContent>
        </Modal>
        </>
    );
    };

    export default ModalCheckOut;