import { useEffect } from "react";
import Product from "../../component/Product/Product";
import Slide from "../../component/slide/Slide";

function Home() {
    const url = window.location.href;
    const scrollToProduct = () => {
        if (url.includes("#product")) {
            window.scrollTo({
                top: 600,
                behavior: "smooth",
            });
            return;
        }
    };
    useEffect(() => {
        scrollToProduct();
    }, []);
    return (
        <>
            <Slide />
            <Product />
        </>
    );
}

export default Home;
