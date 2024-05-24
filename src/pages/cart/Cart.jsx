import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    ADD_TO_CART,
    CALCULATE_SUBTOTAL,
    CALCULATE_TOTAL_QUANTITY,
    CLEAR_CART,
    DECREASE_CART,
    REMOVE_FROM_CART,
    selectCartItems,
    selectCartTotalAmount,
    selectCartTotalQuantity,
} from "../../redux/feature/slice/cartSlice";
import styles from "./Cart.module.scss";
import CheckOut from "../../component/CheckOut/CheckOut";

function Cart() {
    const cartItems = useSelector(selectCartItems);
    const cartTotalAmount = useSelector(selectCartTotalAmount);
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const dispatch = useDispatch();
    const increaseCart = (cart) => {
        dispatch(ADD_TO_CART(cart));
    };

    const decreaseCart = (cart) => {
        dispatch(DECREASE_CART(cart));
    };
    const removeFromCart = (cart) => {
        dispatch(REMOVE_FROM_CART(cart));
    };
    const clearCart = (cart) => {
        dispatch(CLEAR_CART());
    };
    useEffect(() => {
        dispatch(CALCULATE_SUBTOTAL());
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [dispatch, cartItems]);
    return (
        <section>
            <div className={`container px-4 ${styles.table}`}>
                <h2 className="text-2xl font-bold">Giỏ hàng</h2>
                {cartItems.length === 0 ? (
                    <>
                        <p className="font-semibold text-md">Giỏ hàng của bạn đang trống</p>
                        <br />
                        <div>
                            <Link to={`/#product`}>&larr; Tiếp tục mua hàng</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>S/n</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng tiền</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((cart, index) => {
                                    const { id, name, price, imageUrl, cartQuantity } = cart;
                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <p>
                                                    <b>{name}</b>
                                                    <img src={imageUrl} alt={name} style={{ width: "100px" }} />
                                                </p>
                                            </td>
                                            <td>{price}</td>
                                            <td>
                                                <div className={styles.count}>
                                                    <button
                                                        className="px-2 py-2 border border-solid border-zinc-300"
                                                        onClick={() => decreaseCart(cart)}
                                                    >
                                                        -
                                                    </button>
                                                    <p>
                                                        <b>{cartQuantity}</b>
                                                    </p>
                                                    <button
                                                        className="px-2 py-2 border border-solid border-zinc-300"
                                                        onClick={() => increaseCart(cart)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>{price * cartQuantity}</td>
                                            <td className={styles.icons}>
                                                <FaTrashAlt
                                                    size={18}
                                                    color="red"
                                                    onClick={() => removeFromCart(cart)}
                                                />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className={styles.summary}>
                            <button
                                className="px-3 py-2 bg-orange-600 hover:bg-orange-400 text-white rounded-md"
                                onClick={clearCart}
                            >
                                Xoá toàn bộ
                            </button>
                            <div className={styles.checkout}>
                                <div>
                                    <Link to="/#product">&larr; Tiếp tục mua hàng</Link>
                                    <br />
                                    <div className="border shadow-md overflow-hidden rounded-md border-solid border-transparent  p-5">
                                        <p>
                                            <b>{`Số lượng : ${cartTotalQuantity}`}</b>
                                        </p>
                                        <div className={styles.text}>
                                            <h4 className="text-md font-semibold pr-10">Tổng:</h4>
                                            <h3 className="font-bold">{`${cartTotalAmount} VNĐ`}</h3>
                                        </div>

                                        <CheckOut cartItem={cartItems} total={cartTotalAmount} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}

export default Cart;
