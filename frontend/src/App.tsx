import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage.tsx";
import Header from "./components/Header.tsx";

export default function App() {


    return (
        <>
            <Header/>
            <h1>beta4u</h1>
            <Routes>
                <Route path={"/home"} element={<Homepage/>}/>
            </Routes>
        </>
    )
}

