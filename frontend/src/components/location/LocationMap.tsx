import {useEffect, useRef, useState} from "react";
import LocationMarker from "./LocationMarker.tsx";
import {Counters} from "./MyLocations.tsx";
import {User} from "../../types/User.ts";

type LocationMapProps={
    counter: Counters;
    user: User;
}

export default function LocationMap(props: Readonly<LocationMapProps>){
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();



    useEffect(() => {
        if (ref.current && !map) {
            setMap(new google.maps.Map(ref.current, { zoom: 11, center: {lat: 53.54565500799583, lng: 9.982908575419012}}));
        }
    }, [ref, map, props.user]);

    function getPosition(gym:string){
        switch(gym){
            case "UA_HH_OST":
                return {lat: 53.57739139409632, lng: 10.080135284580372}
            case "UA_HH_WEST":
                return {lat: 53.59945171865612, lng: 9.916447204130174};
            case "UA_NDS":
                return {lat: 53.66227448816059, lng: 9.979915498076625};
            case "UA_ST_PAULI":
                return {lat: 53.55679796532782, lng: 9.970252332632851};
        }
    }

    return(
        <>
            <div id="map" ref={ref}></div>
            {Object.entries(props.counter).map(([k,v]) => {return <LocationMarker key={k} position={getPosition(k)} map={map} label={v.toString()}/>})}
        </>
    )
}
