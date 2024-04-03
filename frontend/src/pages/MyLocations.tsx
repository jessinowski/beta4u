import {Status, Wrapper} from "@googlemaps/react-wrapper";
import LocationMap from "../components/location/LocationMap.tsx";
import {User} from "../types/User.ts";
import {useEffect, useState} from "react";

type MyLocationProps={
   user: User;
}

export type Counters={
    [key:string]: number;
}
export default function MyLocations(props: Readonly<MyLocationProps>){
    const [counter, setCounter]=useState<Counters>({});

    useEffect(sumUpBouldersPerGym,[props.user.myFlashes, props.user.myTops]);
    function sumUpBouldersPerGym(){
        const flashedBoulders = props.user.myFlashes ? props.user.myFlashes : [];
        const toppedBoulders = props.user.myTops ? props.user.myTops : [];
        const allBoulders = flashedBoulders.concat(toppedBoulders);
        const counters: Counters ={};
        allBoulders.forEach(boulder => counters[boulder.gym] ? counters[boulder.gym] = +1 : counters[boulder.gym] = 1);
        return setCounter(counters);
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