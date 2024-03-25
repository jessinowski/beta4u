import {useEffect, useState} from "react";
import {Boulder} from "../types/Boulder.ts";
import axios from "axios";
import BoulderCard from "../components/BoulderCard.tsx";
export default function Homepage(){
    const [boulders, setBoulders] = useState<Boulder[]>([]);

    useEffect(fetchData, []);

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
    return(
        <div>
            {boulders.map(boulder => <BoulderCard key={boulder.id} boulder={boulder} fetchData={fetchData}/>)}
        </div>)
}