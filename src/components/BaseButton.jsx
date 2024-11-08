import { Button } from "@nextui-org/react";

export default function ButtonPrimary(handleClick) {
  return (
    <Button color="primary" className="w-32 h-10" onClick={() => handleClick()}>
      Button
    </Button>
  );
}

export function ButtonBanner(handleClick) {
  return (
    <Button className="w-32 h-10 bg-white" onClick={() => handleClick()}>
      Buy Now
    </Button>
  );
}

export function ButtonBuyNow(handleClick) {
  return (
    <Button color="primary" className="w-32 h-10" onClick={() => handleClick()}>
      Buy Now
    </Button>
  );
}

export function ButtonAddToCard(handleClick) {
  return (
    <Button color="default" className="w-32 h-10" onClick={() => handleClick()}>
      Add To Card
    </Button>
  );
}
