import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Header from "./components/Header.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";

export default function App() {
    const [user, setUser] = useState<string | null | undefined>(undefined);

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080": window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")
    }

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }

    useEffect(loadUser, []);

    function loadUser(){
        axios.get("/api/auth/me")
            .then(response => {
                setUser(response.data);
            })
            .catch(() => {
                setUser(null);
            });
    }

    return (
        <>
            <Header/>
            <h1>beta4u</h1>
            <ul>
                {user === null && <li><button onClick={login}>Login Github</button></li>}
                {user !== null && <li><p>Hallo {user}</p></li>}
                {user !== null && <li>
                    <button onClick={logout}>Logout</button>
                </li>}
            </ul>
            <Routes>
            <Route path={"/"}/>
            <Route element={<ProtectedRoutes user={user}/>}>

                    <Route path={"/home"} element={<Homepage/>}/>
                </Route>
            </Routes>
        </>
    )
}

