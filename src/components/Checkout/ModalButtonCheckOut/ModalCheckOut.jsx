import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import ModalCheckOutSucceed from "./ModalCheckOutSucceed";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';  // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS


// เข้าถึง API URL จากไฟล์ .env
const API_URL = import.meta.env.VITE_API_BASE_URL;

const createOrder = async (orderData) => {
  try {
    // ส่งคำขอ POST ไปที่ Backend
    const response = await axios.post(`${API_URL}/orders`, orderData);
    return response.data; // ส่งข้อมูลที่ได้รับกลับไป
  } catch (error) {
    console.error("Error creating order:", error);
    throw error.response?.data || "Something went wrong"; // ถ้ามี error ให้แสดงข้อความ
  }
};

const ModalCheckOut = ({ totalPrice, isModalOpen, setModalOpen, userData, gameId, }) => {

  
  console.log(userData);
  console.log(gameId);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promptpay, setPromptpay] = useState(false);
  const [kbank, setKbank] = useState(false);
  const [scb, setScb] = useState(false);
  const [krungsri, setKrungsri] = useState(false);
  const [creditcard, setCreditCard] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setPromptpay(event.target.value === "promptpay");
    setKbank(event.target.value === "kbank");
    setScb(event.target.value === "scb");
    setKrungsri(event.target.value === "krungsri");
    setCreditCard(event.target.value === "creditcard");
    setPaypal(event.target.value === "paypal");
  };

  const isDisabled = paymentMethod === "";
  const handleSubmitOrder = async () => {
    setIsLoading(true); // เริ่มแสดงสถานะ Loading

    // ตรวจสอบว่ามีการเลือกวิธีการชำระเงินหรือยัง
    if (!paymentMethod) {
      toast.error("กรุณาเลือกวิธีการชำระเงิน"); // แสดงข้อความแจ้งเตือนผู้ใช้
      setIsLoading(false); // หยุดสถานะ Loading
      return; // ยกเลิกการดำเนินการคำสั่งซื้อ
    }

    try {
      const orderData = {
        userId: userData?.id || "defaultUserId", // ใช้ userId จาก userData หรือค่าดีฟอลต์
        gameId: gameId || "defaultGameId", // ใช้ gameId จาก props หรือค่าดีฟอลต์
        amount: totalPrice,
        paymentMethod,
      };
      console.log("Order Data to be sent:", orderData); // Debug ข้อมูลที่จะส่ง



      const response = await createOrder(orderData); // เรียก API เพื่อสร้างคำสั่งซื้อ
      console.log("Order created successfully:", response); // ตรวจสอบผลลัพธ์ที่ได้

      setModalOpen(false); // ปิด Modal
      toast.success("คำสั่งซื้อสำเร็จ!"); // แจ้งเตือนความสำเร็จ
    } catch (error) {
      console.error("Error creating order:", error); // แสดงข้อผิดพลาดใน Console
      toast.error("ไม่สามารถดำเนินการคำสั่งซื้อได้"); // แจ้งเตือนผู้ใช้
    } finally {
      setIsLoading(false); // หยุดสถานะ Loading ไม่ว่าจะสำเร็จหรือผิดพลาด
    }
  };


  return (
    <>
     <ToastContainer />
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
        onClose={() => {
          setModalOpen(false);
        }}
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
                          src="/Images/Banklogo/promptpay.svg"
                          width={70}
                          height={50}
                          alt="Promptpay"
                        />
                        <p className="font-semibold text-white">
                          Promptpay (QR Code)
                        </p>
                      </div>
                      {promptpay && (
                        <div className="p-2 text-white">
                          9999-9999-9999-9999
                        </div>
                      )}
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
                          src="/Images/Banklogo/scb.svg"
                          width={70}
                          height={50}
                          alt="SCB"
                        />
                        <p className="font-semibold text-white">SCB</p>
                      </div>
                      {scb && (
                        <div className="p-2 text-white">
                          8888-8888-8888-8888
                        </div>
                      )}
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
                          src="/Images/Banklogo/bay.svg"
                          width={70}
                          height={50}
                          alt="Krungsri"
                        />
                        <p className="font-semibold text-white">Krungsri</p>
                      </div>
                      {krungsri && (
                        <div className="p-2 text-white">
                          8888-8888-8888-8888
                        </div>
                      )}
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
                          src="/Images/Banklogo/kbank.svg"
                          width={70}
                          height={50}
                          alt="Kbank"
                        />
                        <p className="font-semibold text-white">Kbank</p>
                      </div>
                      {kbank && (
                        <div className="p-2 text-white">
                          8888-8888-8888-8888
                        </div>
                      )}
                    </Radio>
                  </div>
                  <div>
                    <h1 className="text-[20px] font-bold">
                      Other Payment Methods
                    </h1>
                  </div>
                  <div>
                    <Radio
                      value="creditcard"
                      className="hover:scale-105 transition duration-300 ease-in-out"
                      checked={paymentMethod === "creditcard"}
                    >
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src="/Images/Banklogo/mastercard.svg"
                          width={70}
                          height={50}
                          alt="CreditCard"
                        />
                        <p className="font-semibold text-white">Credit Card</p>
                      </div>
                      {creditcard && (
                        <div className="p-2 text-white">
                          8888-8888-8888-8888
                        </div>
                      )}
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
                          src="/Images/Banklogo/paypal.png"
                          width={70}
                          height={50}
                          alt="PayPal"
                        />
                        <p className="font-semibold text-white">PayPal</p>
                      </div>
                      {paypal && (
                        <div className="p-2 text-white">
                          {`paypal@user.com`}
                        </div>
                      )}
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
                <ModalCheckOutSucceed disabled={isDisabled} onSubmitOrder={handleSubmitOrder}
                />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalCheckOut;
