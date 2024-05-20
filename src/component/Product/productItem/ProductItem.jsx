import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { selectLoggedIn } from "../../../redux/feature/slice/authSlice";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../../../redux/feature/slice/cartSlice";
import styles from "./ProductItem.module.scss";
const ProductItem = ({ product, grid, id, name, price, desc, imageUrl }) => {
    const dispatch = useDispatch();
    const nagivate = useNavigate();
    const loggedIn = useSelector(selectLoggedIn);
    const shortenText = (text, n) => {
        if (text.length > n) {
            const shortedText = text.substring(0, n).concat("...");
            return shortedText;
        }
        return text;
    };
    const addToCart = (product) => {
        if (loggedIn) {
            dispatch(ADD_TO_CART(product));
            dispatch(CALCULATE_TOTAL_QUANTITY());
        } else nagivate("/login");
    };
    return (
        <section className="border border-solid border-transparent rounded-md overflow-hidden shadow-md">
            <div className={grid ? `${styles.grid}` : `${styles.list}`}>
                <Link to={`/product-details/${id}`}>
                    <div className={`${styles.img}`}>
                        <img src={imageUrl} alt={name} />
                    </div>
                </Link>
                <div className={styles.content}>
                    <div className={styles.details}>
                        <p>{`${price} VNĐ`}</p>
                        <h4 className="text-md font-semibold">{shortenText(name, 18)}</h4>
                    </div>
                    {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
                    <button
                        className="px-2 py-3 w-full bg-blue-700 text-white hover:bg-blue-500"
                        onClick={() => addToCart(product)}
                    >
                        Thêm vào giỏ
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ProductItem;
