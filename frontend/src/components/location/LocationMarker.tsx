import {useEffect, useState} from "react";
import {Counters} from "../../pages/MyLocations.tsx";

type LocationMarkerProps={
    counters: Counters;
}
export default function LocationMarker(googleProps: google.maps.MarkerOptions, props: Readonly<LocationMarkerProps>) {
    const [marker, setMarker] = useState<google.maps.Marker>();

    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }

        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(googleProps);
        }
    }, [marker, googleProps]);

    return null;
}