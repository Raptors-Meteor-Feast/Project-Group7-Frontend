import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, Button, RadioGroup, Radio } from "@nextui-org/react";
import ModalCheckOutSucceed from "./ModalCheckOutSucceed";

const ModalCheckOut = ({ totalPrice }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");
    const [promptpay, setPromptpay] = useState(false);
    const [kbank, setKbank] = useState(false);
    const [scb, setScb] = useState(false);
    const [krungsri, setKrungsri] = useState(false);
    const [creditcard, setCreditCard] = useState(false);
    const [paypal, setPaypal] = useState(false);

    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
        setPromptpay(event.target.value === "promptpay");
        setKbank(event.target.value === "kbank");
        setScb(event.target.value === "scb");
        setKrungsri(event.target.value === "krungsri");
        setCreditCard(event.target.value === "creditcard");
        setPaypal(event.target.value === "paypal");
    };

    console.log(paymentMethod);
    
    const isDisabled = paymentMethod === "";

    return (
        <>
            <Button
                onPress={() => setModalOpen(true)}
                color="primary"
                className="w-full"
            >
                Check Out
            </Button>
            <Modal
                backdrop="opaque"
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                size="5xl"
                className="bg-zinc-900 text-white"
            >
                <ModalContent className="w-full sm:w-[80vw] md:w-[70vw] lg:w-[60vw] h-[80vh] overflow-auto">
                    <ModalHeader className="flex text-[20px] font-bold gap-1">
                        My Cart
                    </ModalHeader>
                    <hr className="w-full border-1 border-black" />
                    
                    <ModalBody>
                        <div className="flex justify-between p-5">
                            <div className="flex flex-col pr-10 gap-5">
                                <RadioGroup
                                    value={paymentMethod}
                                    onChange={handlePaymentMethodChange}
                                >
                                    <div>
                                        <h1 className="text-[20px] font-bold">PromptPay</h1>
                                    </div>
                                    <div>
                                        <Radio
                                            value="promptpay"
                                            className="hover:scale-105 transition duration-300 ease-in-out" 
                                            checked={paymentMethod === "promptpay"}
                                        >
                                            <div className="flex justify-center items-center gap-2">
                                                <img
                                                    src="src/Images/Banklogo/promptpay.svg"
                                                    width={70}
                                                    height={50}
                                                    alt="Promptpay"
                                                />
                                                <p className="font-semibold text-white">Promptpay (QR Code)</p>
                                                
                                            </div>
                                            {promptpay && 
                                            <div className="p-2 text-white">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aliquam unde dolorem, animi rem non nihil exercitationem quas accusamus veniam voluptatem, nesciunt voluptatibus deleniti commodi. Optio molestias mollitia veritatis veniam.    
                                            </div>}
                                        </Radio>
                                    </div>
                                    <div>
                                        <h1 className="text-[20px] font-bold">Internet Banking</h1>
                                    </div>
                                    <div>
                                        <Radio
                                            value="scb"
                                            className="hover:scale-105 transition duration-300 ease-in-out"
                                            checked={paymentMethod === "scb"}
                                        >
                                            <div className="flex justify-center items-center gap-2">
                                                <img
                                                    src="src/Images/Banklogo/scb.svg"
                                                    width={70}
                                                    height={50}
                                                    alt="SCB"    
                                                />
                                                <p className="font-semibold text-white">SCB</p>
                                            </div>
                                            {scb && 
                                            <div className="p-2 text-white">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aliquam unde dolorem, animi rem non nihil exercitationem quas accusamus veniam voluptatem, nesciunt voluptatibus deleniti commodi. Optio molestias mollitia veritatis veniam.    
                                            </div>}
                                        </Radio>
                                    </div>
                                    <div>
                                        <Radio
                                            value="krungsri"
                                            className="hover:scale-105 transition duration-300 ease-in-out"
                                            checked={paymentMethod === "krungsri"}
                                        >
                                            <div className="flex justify-center items-center gap-2">
                                                <img
                                                    src="src/Images/Banklogo/bay.svg"
                                                    width={70}
                                                    height={50}
                                                    alt="Krungsri"
                                                />
                                                <p className="font-semibold text-white">Krungsri</p>
                                            </div>
                                            {krungsri && 
                                            <div className="p-2 text-white">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aliquam unde dolorem, animi rem non nihil exercitationem quas accusamus veniam voluptatem, nesciunt voluptatibus deleniti commodi. Optio molestias mollitia veritatis veniam.    
                                            </div>}
                                        </Radio>
                                    </div>
                                    <div>
                                        <Radio
                                            value="kbank"
                                            className="hover:scale-105 transition duration-300 ease-in-out"
                                            checked={paymentMethod === "kbank"}
                                        >
                                            <div className="flex justify-center items-center gap-2">
                                                <img
                                                    src="src/Images/Banklogo/kbank.svg"
                                                    width={70}
                                                    height={50}
                                                    alt="Kbank"
                                                />
                                                <p className="font-semibold text-white">Kbank</p>
                                            </div>
                                            {kbank && 
                                            <div className="p-2 text-white">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aliquam unde dolorem, animi rem non nihil exercitationem quas accusamus veniam voluptatem, nesciunt voluptatibus deleniti commodi. Optio molestias mollitia veritatis veniam.    
                                            </div>}
                                        </Radio>
                                    </div>
                                    <div>
                                        <h1 className="text-[20px] font-bold">Other Payment Methods</h1>
                                    </div>
                                    <div>
                                        <Radio
                                            value="creditcard"
                                            className="hover:scale-105 transition duration-300 ease-in-out"
                                            checked={paymentMethod === "creditcard"}
                                        >
                                            <div className="flex justify-center items-center gap-2">
                                                <img
                                                    src="src/Images/NavIcon/mastercard.svg"
                                                    width={70}
                                                    height={50}
                                                    alt="CreditCard"
                                                />
                                                <p className="font-semibold text-white">Credit Card</p>
                                            </div>
                                            {creditcard && 
                                            <div className="p-2 text-white">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aliquam unde dolorem, animi rem non nihil exercitationem quas accusamus veniam voluptatem, nesciunt voluptatibus deleniti commodi. Optio molestias mollitia veritatis veniam.    
                                            </div>}
                                        </Radio>
                                    </div>
                                    <div>
                                        <Radio
                                            value="paypal"
                                            className="hover:scale-105 transition duration-300 ease-in-out"
                                            checked={paymentMethod === "paypal"}
                                        >
                                            <div className="flex justify-center items-center gap-2">
                                                <img
                                                    src="src/Images/NavIcon/paypal.png"
                                                    width={70}
                                                    height={50}
                                                    alt="PayPal"
                                                />
                                                <p className="font-semibold text-white">PayPal</p>
                                            </div>
                                            {paypal && 
                                            <div className="p-2 text-white">
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sed aliquam unde dolorem, animi rem non nihil exercitationem quas accusamus veniam voluptatem, nesciunt voluptatibus deleniti commodi. Optio molestias mollitia veritatis veniam.    
                                            </div>}
                                        </Radio>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="flex flex-col gap-5 sticky top-0">
                                <h3 className="text-[20px] font-bold">Order Summary</h3>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Price:</p>
                                    <p>THB {totalPrice}</p>
                                </div>
                                <div className="flex justify-between">
                                    <p className="font-semibold">Taxes:</p>
                                    <p>Calculated at Checkout</p>
                                </div>
                                <hr className="w-[265px] border-1 border-black" />
                                <div className="flex justify-between">
                                    <p className="font-semibold">Subtotal:</p>
                                    <p>THB {totalPrice}</p>
                                </div>
                                <ModalCheckOutSucceed disabled={isDisabled} />
                            </div>
                        </div>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ModalCheckOut;


