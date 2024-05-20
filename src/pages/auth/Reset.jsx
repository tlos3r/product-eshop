import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import resetImg from "../../assets/forgot.png";
import Loader from "../../component/loader/Loader";
import { auth } from "../../firebase/config";
const Reset = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const resetPassword = (e) => {
        e.preventDefault();
        setIsLoading(true);
        sendPasswordResetEmail(auth, email)
            .then(() => {
                setIsLoading(false);
                toast.success("Reset email link has send to your gmail");
            })
            .catch((error) => {
                setIsLoading(false);
                toast.error(error.message);
            });
    };
    return (
        <>
            {isLoading && <Loader />}
            <ToastContainer />
            <section className="grid items-center content-center grid-cols-2 min-h-full my-20">
                <div className="flex justify-center col-span-1">
                    <img src={resetImg} alt="this is a register images from eShop website" width={660} />
                </div>
                <div className="flex flex-col items-center justify-center w-full col-span-1 text-center">
                    <div className="w-3/4 rounded-md shadow-lg bg-slate-100">
                        <h1 className="mt-3 text-3xl font-bold text-orange-600">Reset Mật Khẩu</h1>
                        <form onSubmit={resetPassword} className="w-full ">
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
                            <button className="w-1/2 py-2 text-white transition delay-150 bg-blue-600 rounded-md hover:translate-y-0 hover:scale-110">
                                Xác Nhận
                            </button>
                            <div className=" flex py-4 text-zinc-500 text-md justify-center gap-10">
                                <Link to="/login">Đăng nhập</Link>
                                <Link to="/register">Đăng ký</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Reset;
