import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { CLEAR_CART } from "../../redux/feature/slice/cartSlice";
import { useNavigate } from "react-router-dom";
export default function CheckOut({ cartItem, total }) {
    const [isShowing, setIsShowing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const wrapperRef = useRef(null);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const dispatch = useDispatch();
    const saveBills = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await addDoc(collection(db, "bills"), {
            name: name,
            address: address,
            phone: phone,
            products: cartItem,
            total: total,
            createdAt: Timestamp.now().toDate(),
        });
        setIsLoading(false);
        toast.success("Đặt hàng thành công vui lòng đợi khoảng 2-3 ngày nhân viên sẽ gọi và mang tới cho bạn !");
        dispatch(CLEAR_CART());
        navigate("/");
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsShowing(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsShowing(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    useEffect(() => {
        let html = document.querySelector("html");

        if (html) {
            if (isShowing && html) {
                html.style.overflowY = "hidden";

                const focusableElements = 'button, [href], input, select, textarea, [tabIndex]:not([tabIndex="-1"])';

                const modal = document.querySelector("#modal"); // select the modal by it's id

                const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal

                const focusableContent = modal.querySelectorAll(focusableElements);

                const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal

                document.addEventListener("keydown", function (e) {
                    if (e.keyCode === 27) {
                        setIsShowing(false);
                    }

                    let isTabPressed = e.key === "Tab" || e.keyCode === 9;

                    if (!isTabPressed) {
                        return;
                    }

                    if (e.shiftKey) {
                        // if shift key pressed for shift + tab combination
                        if (document.activeElement === firstFocusableElement) {
                            lastFocusableElement.focus(); // add focus for the last focusable element
                            e.preventDefault();
                        }
                    } else {
                        // if tab key is pressed
                        if (document.activeElement === lastFocusableElement) {
                            // if focused has reached to last focusable element then focus first focusable element after pressing tab
                            firstFocusableElement.focus(); // add focus for the first focusable element
                            e.preventDefault();
                        }
                    }
                });

                firstFocusableElement.focus();
            } else {
                html.style.overflowY = "visible";
            }
        }
    }, [isShowing]);

    return (
        <>
            <button
                onClick={() => setIsShowing(true)}
                className="px-3 py-4 w-full bg-blue-600 hover:bg-blue-500 rounded-md text-white"
            >
                Thanh toán
            </button>
            {isShowing && typeof document !== "undefined"
                ? ReactDOM.createPortal(
                      <div
                          className="fixed top-0 left-0 z-20 flex h-screen w-screen items-center justify-center bg-slate-300/20 backdrop-blur-sm"
                          aria-labelledby="header-3a content-3a"
                          aria-modal="true"
                          tabIndex="-1"
                          role="dialog"
                      >
                          {/*    <!-- Modal --> */}
                          <div
                              ref={wrapperRef}
                              className="flex max-h-[90vh] w-11/12 max-w-xl flex-col gap-6 overflow-hidden rounded bg-white p-6 text-slate-500 shadow-xl shadow-slate-700/10"
                              id="modal"
                              role="document"
                          >
                              {/*        <!-- Modal header --> */}
                              <header id="header-3a" className="flex items-center gap-4">
                                  <h3 className="flex-1 text-xl font-medium text-slate-700">
                                      Nhập thông tin của bạn để xác nhận thanh toán{" "}
                                  </h3>
                                  <button
                                      onClick={() => setIsShowing(false)}
                                      className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded-full px-5 text-sm font-medium tracking-wide text-orange-500 transition duration-300 hover:bg-orange-100 hover:text-orange-600 focus:bg-orange-200 focus:text-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-orange-300 disabled:shadow-none disabled:hover:bg-transparent"
                                      aria-label="close dialog"
                                  >
                                      <span className="relative only:-mx-5">
                                          <svg
                                              xmlns="http://www.w3.org/2000/svg"
                                              className="h-5 w-5"
                                              fill="none"
                                              viewBox="0 0 24 24"
                                              stroke="currentColor"
                                              strokeWidth="1.5"
                                              role="graphics-symbol"
                                              aria-labelledby="title-79 desc-79"
                                          >
                                              <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  d="M6 18L18 6M6 6l12 12"
                                              />
                                          </svg>
                                      </span>
                                  </button>
                              </header>
                              {/*        <!-- Modal body --> */}
                              <form id="content-3a" className="flex-1" onSubmit={saveBills}>
                                  <div>
                                      <div className="relative w-full min-w-[200px] h-10 mb-7">
                                          <input
                                              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                              placeholder=" "
                                              type="text"
                                              name="name"
                                              value={name}
                                              onChange={(e) => setName(e.target.value)}
                                          />
                                          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                              Tên của bạn
                                          </label>
                                      </div>
                                  </div>
                                  <div>
                                      <div className="relative w-full min-w-[200px] h-10 mb-7">
                                          <input
                                              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                              placeholder=" "
                                              type="text"
                                              value={address}
                                              onChange={(e) => setAddress(e.target.value)}
                                          />
                                          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                              Địa chỉ
                                          </label>
                                      </div>
                                  </div>
                                  <div>
                                      <div className="relative w-full min-w-[200px] h-10 mb-7">
                                          <input
                                              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                                              placeholder=" "
                                              type="text"
                                              value={phone}
                                              onChange={(e) => setPhone(e.target.value)}
                                          />
                                          <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                                              Số điện thoại
                                          </label>
                                      </div>
                                  </div>
                                  <button
                                      className="inline-flex items-center justify-center h-10 gap-2 px-5 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-orange-500 hover:bg-orange-600 focus:bg-orange-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-orange-300 disabled:bg-orange-300 disabled:shadow-none w-full"
                                      type="submit"
                                      disabled={isLoading}
                                  >
                                      <span>{isLoading ? "..." : "Xác nhận"}</span>
                                  </button>
                              </form>
                          </div>
                      </div>,
                      document.body
                  )
                : null}
        </>
    );
}
