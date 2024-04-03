import {Status, Wrapper} from "@googlemaps/react-wrapper";
import LocationMap from "../components/location/LocationMap.tsx";
import {useEffect, useState} from "react";
import {Boulder} from "../types/Boulder.ts";
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
        console.log(allBoulders);
        const counters: Counters ={"UA_HH_OST": 0, "UA_HH_WEST": 0, "UA_ST_PAULI": 0, "UA_NDS": 0};
        allBoulders.forEach(boulder => counters[boulder.gym] = +1);
        console.log(counters);
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