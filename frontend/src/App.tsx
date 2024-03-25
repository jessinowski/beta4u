import {Route, Routes, useNavigate} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Header from "./components/Header.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import {User} from "./types/User.ts";
import ProfilePage from "./pages/ProfilePage.tsx";
import MyFavorites from "./pages/MyFavorites.tsx";
import MyProjects from "./pages/MyProjects.tsx";
import MyFlashes from "./pages/MyFlashes.tsx";
import MyTops from "./pages/MyTops.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import MyLocations from "./pages/MyLocations.tsx";

export default function App() {
    const [user, setUser] = useState<User | null | undefined>(undefined);

    const navigate = useNavigate();

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")
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
            {user && <Header user={user}/>}
            {user && <p>Hallo {user?.username}</p>}
            <h1>beta4u</h1>
            <ul>
                {user === null && <li>
                    <button onClick={login}>Login Github</button>
                </li>}
            </ul>
            <Routes>
                <Route path={"/"}/>
                <Route path={"/sign_up"} element={<SignUpPage fetchUser={fetchUser}/>}></Route>
                <Route element={<ProtectedRoutes user={user}/>}>
                    <Route path={"/home"} element={<Homepage/>}/>
                    <Route path={"/profile"} element={<ProfilePage/>}>
                        <Route path={"favorites"} element={<MyFavorites/>}/>
                        <Route path={"tops"} element={<MyTops/>}/>
                        <Route path={"flashes"} element={<MyFlashes/>}/>
                        <Route path={"projects"} element={<MyProjects/>}/>
                        <Route path={"locations"} element={<MyLocations/>}/>
                    </Route>
                    <Route path={"/editProfile"} element={<EditProfile/>}/>
                </Route>
            </Routes>
        </>
    )
}

