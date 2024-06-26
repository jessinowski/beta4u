import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Header from "./components/Header.tsx";
import axios from "axios";
import {useEffect, useState} from "react";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
import {User} from "./types/User.ts";
import ProfilePage from "./pages/ProfilePage.tsx";
import EditProfile from "./pages/EditProfile.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import BoulderDetails from "./pages/BoulderDetails.tsx";
import {Boulder} from "./types/Boulder.ts";
import "./App.css";

export default function App() {
    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [boulders, setBoulders] = useState<Boulder[]>([]);


    function fetchUser(actionToCall? : () => void) {
        axios.get("/api/user")
            .then(response => {
                setUser(response.data);
                if (actionToCall) {
                   actionToCall();
                }
            })
            .catch(()=>setUser(null))
    }

    useEffect(() => {
        fetchData();
        fetchUser();
    }, []);

    if (!boulders) {
        return "Loading..."
    }

    function fetchData() {
        axios.get("/api/boulders")
            .then(response => setBoulders(response.data))
            .catch(error => {
                console.error("Error fetching boulder", error)
            })
    }

    return (
        <div>
            {user && <Header user={user}/>}
            <Routes >
                <Route path={"/login"} element={<LoginPage/>}/>
                    <Route element={<ProtectedRoutes user={user}/>}>
                        <Route path={"/sign_up"} element={user && <SignUpPage user={user} fetchUser={fetchUser}/>}/>
                        <Route path={"/"} element={user && <Homepage user={user} boulders={boulders} fetchData={fetchData}/>}/>
                        <Route path={"/boulder/:id"} element={user && <BoulderDetails boulders={boulders} fetchData={fetchData} user={user} fetchUser={fetchUser}/>}/>
                        <Route path={"/profile/:id/:tabName?"} element={user && <ProfilePage user={user}/>}/>
                        <Route path={"/editProfile"} element={user && <EditProfile fetchUser={fetchUser} user={user}/>}/>
                </Route>
            </Routes>
        </div>
    )
}

