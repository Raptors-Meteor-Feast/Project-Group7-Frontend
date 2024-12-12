import {Pagination} from "@nextui-org/react";

export default function App() {
    return (
        <div className="bg-neutral-900 flex justify-center items-center pb-8 text-white">
            <Pagination showControls initialPage={1} total={10} variant='faded' color='danger' />
        </div>
    );
};
