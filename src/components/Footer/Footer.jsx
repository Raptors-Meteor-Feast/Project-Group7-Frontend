import PaypalLogo from "/NavIcon/paypal.png";
import VisaLogo from "/NavIcon/visa.png";
import MastercardLogo from "/NavIcon/mastercard.svg";
import AmericanExpressLogo from "/NavIcon/american-express.png";
import DiscoverLogo from "/NavIcon/discover-logo.png";

export default function Footer() {
  return (

    <div className="flex justify-between items-center bg-blue-900 py-5 px-20">

    <p className="font-semibold text-white">Copyright &copy; 2024 Raptors Meteor Feast. All Rights Reserved.</p>
    <div className="hidden md:flex items-center gap-2">
        <p className="font-semibold text-white">We Accept: </p>
        <img className="w-[60px] h-auto object-cover" src={PaypalLogo} alt="paypal icon" />
        <img className="w-[60px] h-auto object-cover" src={VisaLogo} alt="visa icon" />
        <img className="w-[60px] h-auto object-cover" src={MastercardLogo} alt="mastercard icon" />
        <img className="w-[60px] h-auto object-cover" src={AmericanExpressLogo} alt="american express icon" />
        <img className="w-[60px] h-auto object-cover" src={DiscoverLogo} alt="discover icon" />
    </div>
</div>
  )
}
