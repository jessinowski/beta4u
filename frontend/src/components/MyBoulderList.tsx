import {useEffect, useState} from "react";
import {Boulder} from "../types/Boulder.ts";
import axios from "axios";
import {User} from "../types/User.ts";
import BoulderCard from "./BoulderCard.tsx";

type MyBoulderListProps ={
    listType: "favorites" | "flashes" | "tops" | "projects"
    user: User;
}
export default function MyBoulderList(props: Readonly<MyBoulderListProps>){
    const[boulders, setBoulders]= useState<Boulder[]>([]);

    useEffect(fetchBoulders, [props.listType]);
    function fetchBoulders(){
        axios.get("/api/user/" + props.listType)
            .then(response => setBoulders(response.data))
            .catch(error => {
                console.error("Error fetching" + props.listType, error)
            })
    }
    return(
        <div>
            {boulders.length !== 0 ?
                boulders.map(boulder => <BoulderCard key={boulder.id} boulder={boulder} fetchData={fetchBoulders} user={props.user}/>)
                :
                <p>No {props.listType} found</p>}
        </div>
    )
}