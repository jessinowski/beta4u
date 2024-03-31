import {useEffect, useState} from "react";
import {Boulder} from "../types/Boulder.ts";
import axios from "axios";
import {User} from "../types/User.ts";
import BoulderCard from "./BoulderCard.tsx";

type MyFlashesProps={
    user: User;
}
export default function MyFlashes(props: Readonly<MyFlashesProps>){
    const[flashes, setFlashes]= useState<Boulder[]>([]);

    useEffect(fetchFlashes, []);
    function fetchFlashes(){
        axios.get("api/user/flashes")
            .then(response => setFlashes(response.data))
            .catch(error => {
                console.error("Error fetching flashes", error)
            })
    }
    return(
        <div>
            {flashes.map(boulder => <BoulderCard key={boulder.id} boulder={boulder} fetchData={fetchFlashes} user={props.user}/>)}
        </div>
    )
}