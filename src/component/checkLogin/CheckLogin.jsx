import { useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/feature/slice/authSlice";

export function CheckLogin({ children }) {
    const isLoggedIn = useSelector(selectLoggedIn);
    if (isLoggedIn) {
        return children;
    }
    return null;
}

export function CheckLogout({ children }) {
    const isLoggedIn = useSelector(selectLoggedIn);
    if (!isLoggedIn) {
        return children;
    }
    return null;
}
