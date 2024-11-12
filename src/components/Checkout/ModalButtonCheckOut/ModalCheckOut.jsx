    import React from "react";
    import { Modal, ModalContent, ModalHeader, ModalBody, Button, RadioGroup, Radio } from "@nextui-org/react";
    import ModalCheckOutSucceed from "./ModalCheckOutSucceed";

    const ModalCheckOut = ({ totalPrice }) => {
        const [isOpen, setIsOpen] = React.useState(false);
        const [selectedMethod, setSelectedMethod] = React.useState("");
        const handlePaymentMethodChange = (event) =>
            setSelectedMethod(event?.target?.value ?? "");
        const isDisabled = selectedMethod === "";


        console.log(selectedMethod);
        

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
                    className="bg-zinc-900 text-white"
                >
                    <ModalContent className="w-[80vw] h-[80vh]">
                        <ModalHeader className="flex text-[20px] font-bold gap-1">
                            My Cart
                        </ModalHeader>
                        <hr className="w-full border-1 border-black " />

                        <ModalBody>
                            <div className="flex justify-between p-5 ">
                                <div className="flex flex-col pr-10 gap-5">
                                    <RadioGroup
                                        value={selectedMethod}
                                        onChange={handlePaymentMethodChange}
                                    >
                                        <div>
                                            <h1 className="text-[20px] font-bold">PromptPay</h1>
                                        </div>

                                        <div className="">
                                            <Radio
                                                value="promptpay"
                                                className="text-white"
                                                checked={selectedMethod === "promptpay"}
                                            >
                                                <div className="flex justify-center items-center gap-2">
                                                    <img
                                                        src="src/Images/Banklogo/promptpay.svg"
                                                        width={70}
                                                        height={50}
                                                        alt="Promptpay"
                                                    />
                                                    <p>Promptpay (QR Code)</p>
                                                </div>
                                            </Radio>
                                        </div>

                                        <div>
                                            <h1 className="text-[20px] font-bold">Internet Banking</h1>
                                        </div>

                                        <div className="">
                                            <Radio
                                                value="scb"
                                                className="text-white"
                                                checked={selectedMethod === "scb"}
                                            >
                                                <div className="flex justify-center items-center gap-2">
                                                    <img
                                                        src="src/Images/Banklogo/scb.svg"
                                                        width={70}
                                                        height={50}
                                                        alt="SCB"
                                                    />
                                                    <p>SCB</p>
                                                </div>
                                            </Radio>
                                        </div>

                                        <div className="">
                                            <Radio
                                                value="krungsri"
                                                className="text-white"
                                                checked={selectedMethod === "krungsri"}
                                            >
                                                <div className="flex justify-center items-center gap-2">
                                                    <img
                                                        src="src/Images/Banklogo/bay.svg"
                                                        width={70}
                                                        height={50}
                                                        alt="Krungsri"
                                                    />
                                                    <p>Krungsri</p>
                                                </div>
                                            </Radio>
                                        </div>

                                        <div className="">
                                            <Radio
                                                value="kbank"
                                                className="text-white"
                                                checked={selectedMethod === "kbank"}
                                            >
                                                <div className="flex justify-center items-center gap-2">
                                                    <img
                                                        src="src/Images/Banklogo/kbank.svg"
                                                        width={70}
                                                        height={50}
                                                        alt="Kbank"
                                                    />
                                                    <p>Kbank</p>
                                                </div>
                                            </Radio>
                                        </div>

                                        <div>
                                            <h1 className="text-[20px] font-bold">Other Payment Methods</h1>
                                        </div>

                                        <div className="">
                                            <Radio
                                                value="creditcard"
                                                className="text-white"
                                                checked={selectedMethod === "creditcard"}
                                            >
                                                <div className="flex justify-center items-center gap-2">
                                                    <img
                                                        src="src/Images/NavIcon/mastercard.svg"
                                                        width={70}
                                                        height={50}
                                                        alt="credit card"
                                                    />
                                                    <p>Credit Card</p>
                                                </div>
                                            </Radio>
                                        </div>

                                        <div className="">
                                            <Radio
                                                value="paypal"
                                                className="text-white"
                                                checked={selectedMethod === "paypal"}
                                            >
                                                <div className="flex justify-center items-center gap-2">
                                                    <img
                                                        src="src/Images/NavIcon/paypal.png"
                                                        width={70}
                                                        height={50}
                                                        alt="paypal"
                                                    />
                                                    <p>PayPal</p>
                                                </div>
                                            </Radio>
                                        </div>
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
                                    <ModalCheckOutSucceed disabled={isDisabled}/>
                                </div>
                                </div>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                    </>
                );
            };

            export default ModalCheckOut;

