import {Status, Wrapper} from "@googlemaps/react-wrapper";
import LocationMap from "./LocationMap.tsx";
import {useEffect, useState} from "react";
import {Boulder} from "../../types/Boulder.ts";
import axios from "axios";

export type Counters={
    [key: string]: number;
}
export default function MyLocations(){
    const[flashedBoulders, setFlashedBoulders]=useState<Boulder[]>([]);
    const[toppedBoulders, setToppedBoulders]=useState<Boulder[]>([]);
    const [counter, setCounter]=useState<Counters>({});

    useEffect(getFlashes, []);
    function getFlashes(){
        axios.get("/api/user/flashes")
            .then(response => setFlashedBoulders(response.data));
    }

    useEffect(getTops, []);
    function getTops(){
        axios.get("/api/user/tops")
            .then(response => setToppedBoulders(response.data));
    }

    useEffect(sumUpBouldersPerGym,[flashedBoulders, toppedBoulders]);
    function sumUpBouldersPerGym(){
        const allBoulders = flashedBoulders.concat(toppedBoulders);
        const counters: Counters ={};
        allBoulders.forEach(boulder => counters[boulder.gym] ? counters[boulder.gym] += 1 : counters[boulder.gym] = 1);
        setCounter(counters);
    }

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };


    return(
        <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY} render={render}>
            <LocationMap counter={counter}/>
        </Wrapper>
    )
}