import {Navigate, Outlet, useLocation} from "react-router-dom";
import {User} from "../types/User.ts";

type ProtectedRoutesProps={
    user: User | null | undefined;
}
export default function ProtectedRoutes(props: Readonly<ProtectedRoutesProps>) {
    const signUp_url = useLocation();

    if (props.user === undefined) {
        return <div>Loading...</div>
    }

    if (props.user?.newUser && !signUp_url.pathname.endsWith("sign_up")){
        return <Navigate to ="/sign_up"/>
    }

    return (
        props.user ? <Outlet /> : <Navigate to = "/login" />
    )
}