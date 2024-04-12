import {useEffect, useRef, useState} from "react";
import LocationMarker from "./LocationMarker.tsx";
import {Counters} from "./MyLocations.tsx";
import {User} from "../../types/User.ts";

type LocationMapProps = {
    counter: Counters;
    user: User;
}
function handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng,
    map: google.maps.Map,
) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
        browserHasGeolocation
            ? "Error: The Geolocation service failed."
            : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
}
export default function LocationMap(props: Readonly<LocationMapProps>) {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();


    function getPosition(gym: string) {
        switch (gym) {
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

    useEffect(() => {
        if (ref.current && !map) {
            const map = new google.maps.Map(ref.current, {zoom: 12, center: getPosition(props.user.homeGym)})
            const locationButton = document.createElement("button");
            const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow();
            locationButton.textContent = "Show Current Location";
            locationButton.classList.add("custom-map-control-button");
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
            locationButton.addEventListener("click", () => {
                    if (navigator.geolocation) {
                        navigator.geolocation.getCurrentPosition(
                            (position: GeolocationPosition) => {
                                const pos = {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude,
                                };

                                infoWindow.setPosition(pos);
                                infoWindow.setContent("You are here :)");
                                infoWindow.open(map);
                                map && map.setCenter(pos);
                            },
                            () => {
                                handleLocationError(true, infoWindow, map.getCenter()!, map);
                            }
                        );
                    } else {
                        handleLocationError(false, infoWindow, map.getCenter()!, map);
                    }
                }
            );
            setMap(map);
        }
    }, [ref, map, props.user]);

    return (
        <>
            <div id="map" ref={ref}></div>
            {Object.entries(props.counter).map(([k, v]) => {
                return <LocationMarker key={k} position={getPosition(k)} map={map} label={v.toString()}/>
            })}
        </>
    )
}
