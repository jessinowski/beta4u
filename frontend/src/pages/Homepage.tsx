import {useEffect, useState} from "react";
import {Boulder} from "../types/Boulder.ts";
import axios from "axios";
import {User} from "../types/User.ts";
import FilteredBoulders from "../components/FilteredBoulders.tsx";

type HomepageProps={
    user: User;
}
export default function Homepage(props: Readonly<HomepageProps>){
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
            <FilteredBoulders boulders={boulders} fetchData={fetchData} user={props.user}/>
        </div>
    )
}