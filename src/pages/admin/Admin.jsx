import { Route, Routes } from "react-router-dom";
import { AddProduct, Home, NavBar, Order, ViewProducts } from "../../component/Admin";

function Admin() {
    return (
        <div className="flex">
            <div className="w-1/4 min-h-screen">
                <NavBar />
            </div>
            <div className="w-3/4 p-4">
                <Routes>
                    <Route path="/home" element={<Home />} />
                    <Route path="/all-product" element={<ViewProducts />} />
                    <Route path="/orders" element={<Order />} />
                    <Route path="/add-product/:id" element={<AddProduct />} />
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
