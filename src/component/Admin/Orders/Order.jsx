import useFetchCollection from "../../../customHooks/useFetchCollection";
import { useState, useEffect } from "react";
import spinner from "../../../assets/Spinner-1s-267px.gif";
export default function Order() {
    const [orders, setOrders] = useState([]);
    const { data, isLoading } = useFetchCollection("bills");
    // const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        // setIsLoading(true);
        setOrders(data);
        console.log(orders);
    }, [data, orders]);

    return (
        <>
            <h1 className="text-4xl font-bold pb-10">Toàn bộ đơn hàng</h1>
            {/*<!-- Component: Responsive Table --> */}
            {isLoading ? (
                <img src={spinner} alt="Loading" />
            ) : (
                <table className="w-full text-left border border-separate rounded border-slate-200" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th
                                scope="col"
                                className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                            >
                                Id
                            </th>
                            <th
                                scope="col"
                                className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                            >
                                Tên
                            </th>
                            <th
                                scope="col"
                                className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                            >
                                Số điện thoại
                            </th>
                            <th
                                scope="col"
                                className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                            >
                                Địa chỉ
                            </th>
                            <th
                                scope="col"
                                className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                            >
                                Đơn hàng
                            </th>
                            <th
                                scope="col"
                                className="hidden h-12 px-6 text-sm font-medium border-l sm:table-cell first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                            >
                                Tổng giá
                            </th>
                        </tr>
                        {orders.map((order) => {
                            return (
                                <tr className="block border-b sm:table-row last:border-b-0 border-slate-200 sm:border-none">
                                    <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {order.id}
                                    </td>
                                    <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {order.name}
                                    </td>
                                    <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {order.phone}
                                    </td>
                                    <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {order.address}
                                    </td>
                                    <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        <ul class="divide-y divide-slate-100">
                                            {order.products.map((product) => {
                                                return (
                                                    <li class="flex items-start gap-4 px-4 py-3">
                                                        <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center">
                                                            <h4 class="text-base text-slate-700 ">
                                                                {`Tên : ${product.name} `}
                                                            </h4>
                                                            <h4 class="text-base text-slate-700 ">
                                                                {`Số lượng : ${product.cartQuantity}`}
                                                            </h4>
                                                        </div>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </td>
                                    <td className="before:w-24 before:inline-block before:font-medium before:text-slate-700 before:content-[attr(data-th)':'] sm:before:content-none flex items-center sm:table-cell h-12 px-6 text-sm transition duration-300 sm:border-t sm:border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                                        {`${order.total} VNĐ`}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            )}
            {/*<!-- End Responsive Table --> */}
        </>
    );
}
