import loaderImg from "../../assets/loader.gif";
import { createPortal } from "react-dom";

function Loader() {
    return (
        <>
            {createPortal(
                <div className="fixed w-full h-full bg-[#00000099] z-[9]">
                    <div className="flex justify-center items-center w-full h-full">
                        <img src={loaderImg} alt="this img show when page have something to load" />
                    </div>
                </div>,
                document.getElementById("loader")
            )}
        </>
    );
}

export default Loader;
