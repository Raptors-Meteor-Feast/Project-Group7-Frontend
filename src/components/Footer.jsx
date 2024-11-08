

export default function Footer() {
  return (
    <div className="flex justify-between items-center bg-[#1A1E30]">
    <p className="font-semibold text-white">Copyright &copy; 2024 Raptors Meteor Feast. All Rights Reserved.</p>
    <div className="flex items-center gap-2">
        <p className="font-semibold text-white">We Accept: </p>
        <img className="w-[60px]" src="src/assets/NavIcon/paypal.png" alt="paypal icon" />
        <img className="w-[60px]" src="src/assets/NavIcon/visa.png" alt="visa icon" />
        <img className="w-[60px]" src="src/assets/NavIcon/mastercard.svg" alt="mastercard icon" />
    </div>
</div>
  )
}
