import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../assets/register.png";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import Loader from "../../component/loader/Loader";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const registerUser = (e) => {
        e.preventDefault();
        if (password !== cPassword) {
            toast.error("Mật khẩu không khớp ");
        }
        setIsLoading(true);

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setIsLoading(false);
                toast.success("Đăng ký thành công !");
                navigate("/login");
            })
            .catch((error) => {
                toast.error(error.message);
                setIsLoading(false);
            });
    };
    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className="grid items-center content-center grid-cols-2">
                <div className="flex flex-col items-center justify-center w-full col-span-1 text-center">
                    <div className="w-3/4 rounded-md shadow-lg bg-slate-100">
                        <h1 className="mt-3 text-3xl font-bold text-orange-600">Register</h1>
                        <form action="" className="w-full" onSubmit={registerUser}>
                            <input
                                type="text"
                                placeholder="Email"
                                name=""
                                id=""
                                required
                                className="w-1/2 h-10 p-3 my-3 rounded-md focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Password"
                                name=""
                                id=""
                                required
                                className="w-1/2 h-10 p-3 my-3 rounded-md focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name=""
                                id=""
                                required
                                className="w-1/2 h-10 p-3 my-3 rounded-md focus:outline-none"
                                value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                            />
                            <br />
                            <button
                                type="submit"
                                className="w-1/2 py-2 text-white transition delay-150 bg-blue-600 rounded-md hover:translate-y-0 hover:scale-110"
                            >
                                Đăng ký
                            </button>{" "}
                            <br></br>
                            <p className="py-4 text-zinc-500 text-md">
                                Bạn có tài khoản ? Nhấn vào{" "}
                                <Link to="/login" className="font-bold text-black">
                                    đây
                                </Link>{" "}
                                để đăng nhập
                            </p>
                        </form>
                    </div>
                </div>
                <div className="flex justify-center col-span-1">
                    <img src={registerImg} alt="this is a register images from eShop website" width={660} />
                </div>
            </section>
        </>
    );
};

export default Register;
