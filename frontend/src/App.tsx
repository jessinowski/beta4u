import {useEffect, useState} from "react";
import axios from "axios";
import {Boulder} from "./types/Boulder.ts";

export default function App() {
    const [boulders, setBoulders] = useState<Boulder[]>([]);

    useEffect(fetchData,[]);
    if (!boulders) {
        return "Loading..."
    }

    function fetchData() {
        axios.get("/api/boulder")
            .then(response => {setBoulders(response.data);  console.log(boulders)})
            .catch(error => {
                console.error("Error fetching boulder", error)
            })
    }

    return (
        <>
            <h1>beta4u</h1>
            <>{boulders.map(boulder => boulder.id)}</>
        </>
    )
}

