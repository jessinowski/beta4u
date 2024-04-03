import {useEffect, useRef, useState} from "react";
import LocationMarker from "./LocationMarker.tsx";
import {Counters} from "./MyLocations.tsx";

type LocationMapProps={
    counter: Counters;
}

export default function LocationMap(props: Readonly<LocationMapProps>){
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new google.maps.Map(ref.current, { zoom: 10, center: {lat: 53.58018347708099, lng: 9.997859338707288}}));
        }
    }, [ref, map]);

    function getPosition(gym:string){
        switch(gym){
            case "UA_HH_OST":
                return {lat: 53.4, lng: 10.0};
            case "UA_HH_WEST":
                return {lat: 53.8, lng: 10.2};
            case "UA_NDS":
                return {lat: 53.2, lng: 10.1};
            case "UA_ST_PAULI":
                return {lat: 53.4, lng: 10.5};
        }
    }

    console.log(props.counter);

    return(
        <>
            <div id="map" ref={ref}></div>
            {Object.entries(props.counter).map(([k,v]) => {return <LocationMarker key={k} position={getPosition(k)} map={map} label={v.toString()}/>})}
        </>
    )
}
