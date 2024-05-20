import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import styles from "./ProductDetails.module.scss";
import spinnerImg from "../../../assets/Spinner-1s-267px.gif";
import {
    ADD_TO_CART,
    CALCULATE_TOTAL_QUANTITY,
    DECREASE_CART,
    selectCartItems,
} from "../../../redux/feature/slice/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const cart = cartItems.find((cart) => cart.id === id);
    const isCartAdded = cartItems.findIndex((cart) => cart.id === id);
    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
            const obj = {
                id,
                ...docSnap.data(),
            };
            setProduct(obj);
        } else {
            toast.info("Không tìm thấy sản phẩm ?");
        }
    };

    const addToCart = (product) => {
        dispatch(ADD_TO_CART(product));
        dispatch(CALCULATE_TOTAL_QUANTITY());
    };

    const decreaseCart = (product) => {
        dispatch(DECREASE_CART(product));
        dispatch(CALCULATE_TOTAL_QUANTITY());
    };

    return (
        <section>
            <div className={`container  ${styles.product}`}>
                <h2 className="text-xl font-bold">Products Details</h2>
                <div>
                    <Link className="flex items-center transition-all delay-150 text-md hover:text-xl" to={`/#product`}>
                        &larr; Quay lại trang chủ
                    </Link>
                </div>
                {product === null ? (
                    <img src={spinnerImg} alt="Loading..." />
                ) : (
                    <>
                        <div className={styles.details}>
                            <div className={styles.img}>
                                <img src={product.imageUrl} alt={product.name} />
                            </div>
                            <div className={styles.content}>
                                <h3 className="font-bold text-md">{product.name}</h3>
                                <p className={styles.price}>{`$${product.price}`}</p>
                                <p>{product.desc}</p>
                                <p>
                                    <b>ID</b> {product.id}
                                </p>
                                <p>
                                    <b>Hãng</b> {product.brand}
                                </p>
                                <div className={styles.count}>
                                    {isCartAdded < 0 ? null : (
                                        <>
                                            <button
                                                className="px-2 border border-zinc-600 border-solid rounded-md bg-zinc-300"
                                                onClick={() => decreaseCart(product)}
                                            >
                                                {" "}
                                                -{" "}
                                            </button>
                                            <p>
                                                <b>{cart.cartQuantity}</b>
                                            </p>
                                            <button
                                                className="px-2 border border-zinc-600 border-solid rounded-md bg-zinc-300"
                                                onClick={() => addToCart(product)}
                                            >
                                                {" "}
                                                +{" "}
                                            </button>
                                        </>
                                    )}
                                </div>
                                <button
                                    className="px-2 py-3 text-white bg-orange-500 rounded-md"
                                    onClick={() => addToCart(product)}
                                >
                                    Thêm vào giỏ
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default ProductDetails;
