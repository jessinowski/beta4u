import {Status, Wrapper} from "@googlemaps/react-wrapper";
import LocationMap from "../components/location/LocationMap.tsx";
import {User} from "../types/User.ts";

type MyLocationProps={
   user: User;
}

export type Counters={
    [key:string]: number;
}
export default function MyLocations(props: Readonly<MyLocationProps>){

    function sumUpBouldersPerGym(){
        const flashedBoulders = props.user.myFlashes ? props.user.myFlashes : [];
        const toppedBoulders = props.user.myTops ? props.user.myTops : [];
        const allBoulders = flashedBoulders.concat(toppedBoulders);
        const counters: Counters ={};
        allBoulders.forEach(boulder => counters[boulder.gym] ? counters[boulder.gym] = +1 : counters[boulder.gym] = 1);
        return counters;
    }

    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    return(
        <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY} render={render}>
            <LocationMap counters={sumUpBouldersPerGym}/>
        </Wrapper>
    )
}