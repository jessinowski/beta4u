import {Route, Routes, useNavigate} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Header from "./components/Header.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import {User} from "./types/User.ts";

export default function App() {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    const navigate = useNavigate();

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }

    useEffect(loadUser, [navigate]);

    function loadUser() {
        axios.get("/api/auth/me")
            .then(response => {
                if (response.data) {
                    fetchUser();
                } else {
                    navigate("/sign_up")
                }
            })
            .catch(() => {
                setUser(null);
            });
    }

    function fetchUser() {
        axios.get("/api/user")
            .then(response => {
                setUser(response.data)
            })
    }

    return (
        <>
            {user && <Header/>}
            {user && <p>Hallo {user?.username}</p>}
            <h1>beta4u</h1>
            <ul>
                {user === null && <li>
                    <button onClick={login}>Login Github</button>
                </li>}

                {user !== null && <li>
                    <button onClick={logout}>Logout</button>
                </li>}
            </ul>
            <Routes>
                <Route path={"/"}/>
                <Route path={"/sign_up"} element={<SignUpPage fetchUser={fetchUser}/>}></Route>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/home"} element={<Homepage/>}/>
                </Route>
            </Routes>
        </>
    )
}

