import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginImg from "../../assets/login.png";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { auth } from "../../firebase/config";
import Loader from "../../component/loader/Loader";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                setIsLoading(false);
                toast.success("Đăng nhập thành công !");
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
                setIsLoading(false);
            });
    };
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                // const user = result.user;
                toast.success("Đăng nhập thành công !");
                navigate("/");
            })
            .catch((error) => {
                // Handle Errors here.
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    };
    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className="grid items-center content-center grid-cols-2">
                <div className="flex justify-center col-span-1">
                    <img src={loginImg} alt="this is a login page from eShop website" width={660} />
                </div>
                <div className="flex flex-col justify-center w-full col-span-1 text-center ">
                    <div className="w-3/4 rounded-md shadow-lg bg-slate-100">
                        <h1 className="mt-3 text-3xl font-bold text-orange-600">Login</h1>
                        <form onSubmit={loginUser} className="w-full ">
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                className="w-1/2 h-10 p-3 my-3 rounded-md focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Mật khẩu"
                                required
                                className="w-1/2 h-10 p-3 my-3 rounded-md focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <button className="w-1/2 py-2 text-white transition delay-150 bg-blue-600 rounded-md hover:translate-y-0 hover:scale-110">
                                Đăng nhập
                            </button>{" "}
                            <br></br>
                            <Link
                                to="/reset"
                                className="flex justify-center py-2 transition delay-150 text-zinc-500 hover:translate-y-0 hover:scale-110"
                            >
                                Quên mật khẩu ?
                            </Link>
                            <p className="font-bold text-zinc-500 text-md">-- hoặc là --</p>
                        </form>
                        <button
                            className="w-1/2 py-2 mb-4 text-white transition delay-150 bg-orange-600 rounded-md hover:translate-y-0 hover:scale-110 "
                            onClick={signInWithGoogle}
                        >
                            Đăng nhập với Google
                        </button>
                        <p className="text-zinc-500 text-md">
                            Không có tài khoản ? Nhấn vào{" "}
                            <Link to="/register" className="font-bold text-black">
                                đây
                            </Link>{" "}
                            để đăng ký
                        </p>
                        <p>
                            <b>Admin:</b> abc@hotmail.com / 123456
                        </p>
                        <p>
                            <b>User:</b> test@gmail.com / 123456
                        </p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
