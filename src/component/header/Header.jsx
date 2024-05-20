import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER, selectLoggedIn } from "../../redux/feature/slice/authSlice";
import { CheckLogin, CheckLogout } from "../checkLogin/CheckLogin.jsx";
import { AdminOnlyLink } from "../AdminOnlyRoute/AdminOnlyRoute";
import { CALCULATE_TOTAL_QUANTITY, selectCartTotalQuantity } from "../../redux/feature/slice/cartSlice";

const logo = (
    <Link to="/">
        <h2 className="text-2xl text-white">
            e<span className="text-3xl text-orange-500">Shop</span>.
        </h2>
    </Link>
);
function Header() {
    const [userName, setUserName] = useState("");
    const [scrollPage, setScrollPage] = useState(false);
    const dispatch = useDispatch();
    const nagivate = useNavigate();
    const cartTotalQuantity = useSelector(selectCartTotalQuantity);
    const isLoggedIn = useSelector(selectLoggedIn);

    useEffect(() => {
        dispatch(CALCULATE_TOTAL_QUANTITY());
    }, [dispatch]);
    const fixNavbar = () => {
        window.scrollY > 50 ? setScrollPage(true) : setScrollPage(false);
    };

    window.addEventListener("scroll", fixNavbar);

    // manage when user login or out
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (user.displayName === null) {
                    // get name before @gmail.com
                    const getNameEmail = user.email.substring(0, user.email.indexOf("@"));
                    const uName = getNameEmail.charAt(0).toUpperCase() + getNameEmail.slice(1);
                    user.displayName = uName;
                    setUserName(uName);
                } else setUserName(user.displayName);
                dispatch(
                    SET_ACTIVE_USER({
                        email: user.email,
                        userName: user.displayName,
                        userID: user.uid,
                    })
                );
            } else {
                setUserName("");
                dispatch(REMOVE_ACTIVE_USER());
            }
        });
    }, [dispatch]);
    const signOutUser = (event) => {
        event.preventDefault();
        signOut(auth)
            .then(() => {
                toast.success("Đăng xuất thành công !");
                nagivate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };
    const cart = (
        <Link
            to={isLoggedIn ? "/cart" : "/login"}
            className="relative flex items-center gap-1 transition delay-150 text-md hover:-translate-y-0 hover:scale-110"
        >
            Giỏ hàng
            <FaShoppingCart size={20} />
            <span className="absolute right-[-10px] bottom-3">{cartTotalQuantity}</span>
        </Link>
    );
    return (
        <>
            <header
                className={
                    scrollPage
                        ? "container top-0 z-10 grid h-12 grid-cols-2 bg-slate-900 fixed"
                        : "container top-0 z-10 grid h-12 grid-cols-2 bg-slate-900"
                }
            >
                <div className="flex items-center ml-4">{logo}</div>
                <div className={"items-center justify-center md:flex"}>
                    <nav className="">
                        <ul className="items-center gap-4 pl-4 text-white md:flex md:mr-10">
                            <AdminOnlyLink>
                                <li>
                                    <button className="flex px-3 py-2 transition delay-150 bg-blue-500 rounded-md hover:-translate-y-0 hover:scale-110">
                                        <Link to="/admin">Admin</Link>
                                    </button>
                                </li>
                            </AdminOnlyLink>
                            <li>
                                <NavLink
                                    to="/"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-md transition delay-150 border-b-4 border-solid border-zinc-500 hover:-translate-y-0 hover:scale-110 "
                                            : "flex text-md transition delay-150 hover:-translate-y-0 hover:scale-110 "
                                    }
                                >
                                    Trang chủ
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    to="/privacy-policy"
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex text-md border-b-4 delay-150 border-solid border-zinc-500 hover:-translate-y-0 hover:scale-110"
                                            : "flex text-md transition delay-150  hover:-translate-y-0 hover:scale-110"
                                    }
                                >
                                    Chính sách
                                </NavLink>
                            </li>
                            <li>{cart}</li>
                            <CheckLogin>
                                <li className="flex items-center gap-1 whitespace-pre-wrap cursor-default">
                                    <FaUserCircle />
                                    <p>Xin chào, </p>
                                    <p className="text-orange-500 cursor-default " href="#">
                                        {userName}
                                    </p>
                                </li>
                                <li>
                                    <p
                                        onClick={signOutUser}
                                        className="flex transition delay-150 cursor-pointer text-md hover:-translate-y-0 hover:scale-110"
                                    >
                                        Đăng xuất
                                    </p>
                                </li>
                            </CheckLogin>
                            <CheckLogout>
                                <li>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex text-md border-b-4 delay-150 border-solid border-zinc-500 hover:-translate-y-0 hover:scale-110"
                                                : "flex text-md transition delay-150  hover:-translate-y-0 hover:scale-110"
                                        }
                                    >
                                        Đăng nhập
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex text-md border-b-4 delay-150 border-solid border-zinc-500 hover:-translate-y-0 hover:scale-110"
                                                : "flex text-md transition delay-150  hover:-translate-y-0 hover:scale-110"
                                        }
                                    >
                                        Đăng kí
                                    </NavLink>
                                </li>
                            </CheckLogout>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;
