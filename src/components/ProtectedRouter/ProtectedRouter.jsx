import { useSelector } from "react-redux";
import { Navigate, useHref, useSearchParams } from "react-router-dom";
import { getCookie } from "../../Utilites/Cookie";
import Spiner from "../Spiner/Spiner";


export default function ProtectedRouter({ isProtected = false, children }) {

    const user = Boolean(getCookie("token"));
    const isAutchCheck = useSelector(state => state.user.isAutchCheck);
    const href = useHref();
    const [url] = useSearchParams();


    switch (true) {
        case !isAutchCheck && isProtected:
            return <Spiner />

        case isProtected && !user:
            return <Navigate to="?login=true" replace />

        case !isProtected && user:

            if (url.get("login") || url.get("registration") || url.get("reset_password")) {
                return <Navigate to={href} replace />
            }
            break;

        default: return <>{children}</>
    }

}