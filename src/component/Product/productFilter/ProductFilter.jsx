import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FILTER_BY_BRAND, FILTER_BY_CATEGORY, FILTER_BY_PRICE } from "../../../redux/feature/slice/filterSlice";
import { selectMaxPrice, selectMinPrice, selectProducts } from "../../../redux/feature/slice/productSlice";
import styles from "./ProductFilter.module.scss";
const ProductFilter = () => {
    const [category, setCategory] = useState("All");
    const [brand, setBrand] = useState("All");
    const [price, setPrice] = useState(3000);

    const products = useSelector(selectProducts);
    const minPrice = useSelector(selectMinPrice);
    const maxPrice = useSelector(selectMaxPrice);
    const allCategories = ["All", ...new Set(products.map((product) => product.category))];
    const allBrands = ["All", ...new Set(products.map((product) => product.brand))];
    // console.log(allBrands);
    const dispatch = useDispatch();
    // console.log(allCategories);
    useEffect(() => {
        dispatch(FILTER_BY_BRAND({ products, brand }));
    }, [dispatch, brand, products]);
    useEffect(() => {
        dispatch(
            FILTER_BY_PRICE({
                products,
                price,
            })
        );
    }, [dispatch, products, price]);
    const filterProducts = (cat) => {
        setCategory(cat);
        dispatch(FILTER_BY_CATEGORY({ products, category: cat }));
    };

    const clearFilter = () => {
        setCategory("All");
        setBrand("All");
        setPrice(maxPrice);
        toast.success("Reset thành công !");
    };
    return (
        <div className={styles.filter}>
            <h4 className="text-md font-semibold">Danh mục</h4>
            <div className={styles.category}>
                {allCategories.map((cat, index) => {
                    return (
                        <button
                            key={index}
                            type="button"
                            className={`${category}` === cat ? `${styles.active} ` : null}
                            onClick={() => filterProducts(cat)}
                        >
                            {cat}
                        </button>
                    );
                })}
            </div>
            <h4 className="text-md font-semibold">Hãng</h4>
            <div className={styles.brand}>
                <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    name="brand"
                    className="bg-transparent"
                >
                    {allBrands.map((brand, index) => {
                        return (
                            <option key={index} value={brand}>
                                {brand}
                            </option>
                        );
                    })}
                </select>
                <h4 className="text-md font-semibold">Giá</h4>
                <p>{`${price} VNĐ`}</p>
                <div className={styles.price}>
                    <input
                        type="range"
                        value={price}
                        min={minPrice}
                        max={maxPrice}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={clearFilter} className="px-2 py-3 text-white bg-blue-500">
                Xoá bộ lọc
            </button>
        </div>
    );
};

export default ProductFilter;
