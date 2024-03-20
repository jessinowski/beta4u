import {useEffect, useState} from "react";
import axios from "axios";
import {Boulder} from "./types/Boulder.ts";

export default function App() {
    const [boulderList, setBoulderList] = useState<Boulder[]>([]);

    useEffect(fetchData,[]);
    if (!boulderList) {
        return "Loading..."
    }

    function fetchData() {
        axios.get("/api/boulder")
            .then(response => {setBoulderList(response.data);  console.log(boulderList)})
            .catch(error => {
                console.error("Error fetching boulder", error)
            })
    }

    return (
        <>
            <h1>beta4u</h1>
            <>{boulderList.map(boulder => boulder.id)}</>
        </>
    )
}

