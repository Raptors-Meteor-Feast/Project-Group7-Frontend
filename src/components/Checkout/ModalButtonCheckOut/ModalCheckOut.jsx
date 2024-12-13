import { useState, useEffect } from "react";
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
import axios from "axios";
import { toast } from "react-toastify"; // Import toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { useCart } from "../CartContext";

// เข้าถึง API URL จากไฟล์ .env
const API_URL = import.meta.env.VITE_API_BASE_URL;

const createOrder = async (orderData) => {
  try {
    console.log("Sending order data:", orderData); // ตรวจสอบค่าที่ส่งไป
    const response = await axios.post(`${API_URL}/orders`, orderData);
    console.log("Response:", response); // ตรวจสอบการตอบกลับ
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error.response?.data || "Something went wrong";
  }
};

const ModalCheckOut = ({ totalPrice, isModalOpen, setModalOpen }) => {
  const { cart, setCart, clearCart } = useCart(); // เข้าถึงข้อมูลและฟังก์ชันการจัดการตะกร้า
  const [paymentMethod, setPaymentMethod] = useState("");
  const [promptpay, setPromptpay] = useState(false);
  const [kbank, setKbank] = useState(false);
  const [scb, setScb] = useState(false);
  const [krungsri, setKrungsri] = useState(false);
  const [creditcard, setCreditCard] = useState(false);
  const [paypal, setPaypal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [userData, setUserData] = useState(null); // เก็บข้อมูลผู้ใช้จาก backend
  const [orderId, setOrderId] = useState(null);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setPromptpay(event.target.value === "promptpay");
    setKbank(event.target.value === "kbank");
    setScb(event.target.value === "scb");
    setKrungsri(event.target.value === "krungsri");
    setCreditCard(event.target.value === "creditcard");
    setPaypal(event.target.value === "paypal");
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        setLogIn(false);
        return;
      }

      try {
        const parsedToken = JSON.parse(atob(token.split(".")[1]));
        setLogIn(!!parsedToken);

        if (parsedToken && !userData) {
          const response = await axios.get(`${API_URL}/user/data`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserData(response.data);
        }
      } catch (error) {
        console.error("Error processing token or fetching data:", error);
        localStorage.removeItem("authToken");
        setLogIn(false);
      }
    };

    fetchData();
  }, [userData]);

  const isDisabled = paymentMethod === "";

  const handleSubmitOrder = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    if (!paymentMethod || !cart.length) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      setIsLoading(false);
      return;
    }

    if (!userData) {
      // ตรวจสอบว่ามี userId หรือไม่
      toast.error("ข้อมูลผู้ใช้ไม่ถูกต้อง");
      setIsLoading(false);
      return;
    }

    try {
      const amount = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const gameId = cart[0].gameId; // เลือก gameId ตัวแรกจาก cart

      const orderData = {
        gameId: gameId,
        amount: amount,
        paymentMethod,
      };

      const response = await axios.post(`${API_URL}/orders`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orderId = response.data.orderId; // ดึง orderId จาก Response

      console.log("Order ID:", orderId);
      setOrderId(orderId);

      clearCart(); // เคลียร์ตะกร้าโดยไม่ปิด Modal

      toast.success("คำสั่งซื้อสำเร็จ!"); // แสดงข้อความสำเร็จ
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("ไม่สามารถดำเนินการคำสั่งซื้อได้");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        onPress={() => setModalOpen(true)}
        color="danger"
        className="w-full transform transition-all duration-500 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white] hover:bg-black font-bold"
      >
        CHECK OUT
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
                  <div className="pb-3">
                    <h1 className="text-[20px] font-bold">PromptPay</h1>
                  </div>
                  <div
                    className="rounded-lg py-2 pl-4 pr-6 w-[350px] bg-neutral-800 flex justify-start items-center 
                    hover:bg-neutral-900 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
                    style={{
                      boxShadow:
                        paymentMethod === "promptpay"
                          ? "0 0 10px blue, 0 0 20px blue"
                          : "none",
                    }}
                  >
                    <Radio
                      value="promptpay"
                      checked={paymentMethod === "promptpay"}
                    >
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src="/Images/Banklogo/promptpay.svg"
                          width={70}
                          height={50}
                          alt="Promptpay"
                          className="pl-2 hover:scale-105 transform transition-all duration-300"
                        />
                        <div className="pl-3 h-[50px]">
                          <p className="font-semibold text-white">
                            Promptpay (QR Code)
                          </p>
                          {promptpay && (
                            <div className="text-white">
                              9999-9999-9999-9999
                            </div>
                          )}
                        </div>
                      </div>
                    </Radio>
                  </div>
                  <div>
                    <h1 className="text-[20px] font-bold py-3">
                      Internet Banking
                    </h1>
                  </div>
                  <div
                    className="rounded-lg py-2 pl-4 pr-6 w-[350px] bg-neutral-800 flex justify-start items-center
                    hover:bg-neutral-900 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
                    style={{
                      boxShadow:
                        paymentMethod === "scb"
                          ? "0 0 10px violet, 0 0 20px violet"
                          : "none",
                    }}
                  >
                    <Radio value="scb" checked={paymentMethod === "scb"}>
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src="/Images/Banklogo/scb.svg"
                          width={70}
                          height={50}
                          alt="SCB"
                          className="pl-2 hover:scale-105 transform transition-all duration-300"
                        />
                        <div className="pl-3 h-[50px]">
                          <p className="font-semibold text-white">SCB</p>
                          {scb && (
                            <div className="text-white">
                              8888-8888-8888-8888
                            </div>
                          )}
                        </div>
                      </div>
                    </Radio>
                  </div>
                  <div
                    className="rounded-lg py-2 pl-4 pr-6 w-[350px] bg-neutral-800 flex justify-start item-center
                    hover:bg-neutral-900 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
                    style={{
                      boxShadow:
                        paymentMethod === "krungsri"
                          ? "0 0 10px yellow, 0 0 20px yellow"
                          : "none",
                    }}
                  >
                    <Radio
                      value="krungsri"
                      checked={paymentMethod === "krungsri"}
                    >
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src="/Images/Banklogo/bay.svg"
                          width={70}
                          height={50}
                          alt="Krungsri"
                          className="pl-2 hover:scale-105 transform transition-all duration-300"
                        />
                        <div className="pl-3 h-[50px]">
                          <p className="font-semibold text-white">Krungsri</p>
                          {krungsri && (
                            <div className=" text-white">
                              8888-8888-8888-8888
                            </div>
                          )}
                        </div>
                      </div>
                    </Radio>
                  </div>
                  <div
                    className="rounded-lg py-2 pl-4 pr-6 w-[350px] bg-neutral-800 flex justify-start item-center
                    hover:bg-neutral-900 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
                    style={{
                      boxShadow:
                        paymentMethod === "kbank"
                          ? "0 0 10px green, 0 0 20px green"
                          : "none",
                    }}
                  >
                    <Radio value="kbank" checked={paymentMethod === "kbank"}>
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src="/Images/Banklogo/kbank.svg"
                          width={70}
                          height={50}
                          alt="Kbank"
                          className="pl-2 hover:scale-105 transform transition-all duration-300"
                        />
                        <div className="pl-3 h-[50px]">
                          <p className="font-semibold text-white">Kbank</p>
                          {kbank && (
                            <div className=" text-white">
                              8888-8888-8888-8888
                            </div>
                          )}
                        </div>
                      </div>
                    </Radio>
                  </div>
                  <div>
                    <h1 className="text-[20px] font-bold py-3">
                      Other Payment Methods
                    </h1>
                  </div>
                  <div
                    className="rounded-lg py-2 pl-4 pr-6 h-[90px] bg-neutral-800 flex justify-start item-center
                    hover:bg-neutral-900 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
                    style={{
                      boxShadow:
                        paymentMethod === "creditcard"
                          ? "0 0 10px orange, 0 0 20px red"
                          : "none",
                    }}
                  >
                    <Radio
                      value="creditcard"
                      checked={paymentMethod === "creditcard"}
                    >
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src="/Images/Banklogo/mastercard.svg"
                          width={70}
                          height={50}
                          alt="CreditCard"
                          className="pl-2 hover:scale-105 transform transition-all duration-300"
                        />
                        <div className="pl-3 h-[50px]">
                          <p className="font-semibold text-white">
                            Credit Card
                          </p>
                          {creditcard && (
                            <div className=" text-white">coming soon</div>
                          )}
                        </div>
                      </div>
                    </Radio>
                  </div>
                  <div
                    className="rounded-lg py-2 pl-4 pr-6 w-[350px] bg-neutral-800 flex justify-start item-center
                    hover:bg-neutral-900 transform transition-all duration-300 hover:scale-105 hover:[box-shadow:_0_0_10px_white,_0_0_20px_white]"
                    style={{
                      boxShadow:
                        paymentMethod === "paypal"
                          ? "0 0 10px white, 0 0 20px blue"
                          : "none",
                    }}
                  >
                    <Radio value="paypal" checked={paymentMethod === "paypal"}>
                      <div className="flex justify-center items-center gap-2">
                        <img
                          src="/Images/Banklogo/paypal.png"
                          width={70}
                          height={50}
                          alt="PayPal"
                          className="pl-2 hover:scale-105 transform transition-all duration-300"
                        />
                        <div className="pl-3 h-[50px]">
                          <p className="font-semibold text-white">PayPal</p>
                          {paypal && (
                            <div className=" text-white">coming soon</div>
                          )}
                        </div>
                      </div>
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
                <div className="flex justify-between font-bold text-xl">
                  <p>TOTAL</p>
                  <p>THB {totalPrice}</p>
                </div>
                <ModalCheckOutSucceed
                  disabled={isDisabled}
                  onSubmitOrder={handleSubmitOrder}
                  orderId={orderId}
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
