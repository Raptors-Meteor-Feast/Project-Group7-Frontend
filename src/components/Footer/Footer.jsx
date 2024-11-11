

export default function Footer() {
  return (
    <div className="flex justify-between items-center bg-[#1A1E30] px-20">
    <p className="font-semibold text-white">Copyright &copy; 2024 Raptors Meteor Feast. All Rights Reserved.</p>
    <div className="flex items-center gap-2">
        <p className="font-semibold text-white">We Accept: </p>
        <img className="w-[60px] h-auto object-cover" src="src/Images/NavIcon/paypal.png" alt="paypal icon" />
        <img className="w-[60px] h-auto object-cover" src="src/Images/NavIcon/visa.png" alt="visa icon" />
        <img className="w-[60px] h-auto object-cover" src="src/Images/NavIcon/mastercard.svg" alt="mastercard icon" />
        <img className="w-[60px] h-auto object-cover" src="src/Images/NavIcon/american-express.png" alt="american express icon" />
        <img className="w-[60px] h-auto object-cover" src="src/Images/NavIcon/discover-logo.png" alt="discover icon" />
    </div>
</div>
  )
}
