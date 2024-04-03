import {useEffect, useRef, useState} from "react";
import LocationMarker from "./LocationMarker.tsx";
import {Counters} from "../../pages/MyLocations.tsx";
import {Gym} from "../../types/enums.ts";

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

    console.log(props.counter);

    return(
        <>
            <div id="map" ref={ref}></div>
            <LocationMarker position={{lat: 53.4, lng: 10.0}} map={map} label={"1"}/>
        </>
    )
}
