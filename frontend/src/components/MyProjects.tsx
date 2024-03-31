import {User} from "../types/User.ts";
import {Boulder} from "../types/Boulder.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import BoulderCard from "./BoulderCard.tsx";

type MyProjectsProps={
    user: User;
}
export default function MyProjects(props: Readonly<MyProjectsProps>){
    const[projects, setProjects]=useState<Boulder[]>([]);

    useEffect(fetchProjects, []);
    function fetchProjects(){
        axios.get("/api/user/projects")
            .then(response=>setProjects(response.data))
            .catch(error=>{
                console.error("Error fetching projects", error)
            })
    }
    return(
        <div>
            {projects.map(boulder => <BoulderCard key={boulder.id} boulder={boulder} fetchData={fetchProjects} user={props.user}/>)}
        </div>
    )
}