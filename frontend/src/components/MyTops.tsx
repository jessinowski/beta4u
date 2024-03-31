import {User} from "../types/User.ts";
import {useEffect, useState} from "react";
import {Boulder} from "../types/Boulder.ts";
import axios from "axios";
import BoulderCard from "./BoulderCard.tsx";

type MyTopsProps = {
    user: User;
}
export default function MyTops(props: Readonly<MyTopsProps>){
    const[tops, setTops]= useState<Boulder[]>([]);

    useEffect(fetchTops, []);
    function fetchTops(){
        axios.get("/api/user/tops")
            .then(response => setTops(response.data))
            .catch(error => {
                console.error("Error fetching tops", error)
            })
    }
    return(
        <div>
            {tops.length !== 0 ?
                tops.map(boulder => <BoulderCard key={boulder.id} boulder={boulder} fetchData={fetchTops} user={props.user}/>)
                :
                <p>No tops found</p>}
            {}
        </div>
    )
}