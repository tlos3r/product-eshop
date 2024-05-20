import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { selectProducts, STORE_PRODUCT, GET_PRICE_RANGE } from "../../redux/feature/slice/productSlice";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";
import spinnerImg from "../../assets/Spinner-1s-267px.gif";
import { FaCogs } from "react-icons/fa";

const Product = () => {
    const { data, isLoading } = useFetchCollection("products");
    const [showFilter, setShowFilter] = useState(false);

    const dispatch = useDispatch();
    const products = useSelector(selectProducts);

    useEffect(() => {
        dispatch(
            STORE_PRODUCT({
                products: data,
            })
        );

        dispatch(GET_PRICE_RANGE({ products: data }));
    }, [data, dispatch]);

    const toggleFilter = () => {
        setShowFilter(!showFilter);
    };
    return (
        <section>
            <div className={`container px-3 ${styles.product}`}>
                <aside className={showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`}>
                    {isLoading ? null : <ProductFilter />}
                </aside>
                <div className={styles.content}>
                    {isLoading ? (
                        <img src={spinnerImg} alt="Loading..." className="flex justify-center items-center  flex-col" />
                    ) : (
                        <ProductList products={products} />
                    )}
                    <div className={styles.icon} onClick={toggleFilter}>
                        <FaCogs size={20} color="orangered" />
                        <b>{showFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}</b>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;
