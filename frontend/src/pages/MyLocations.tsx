import {Status, Wrapper} from "@googlemaps/react-wrapper";
import LocationMap from "../components/location/LocationMap.tsx";


export default function MyLocations(){
    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    return(
        <Wrapper apiKey={import.meta.env.VITE_GOOGLE_API_KEY} render={render}>
            <LocationMap/>
        </Wrapper>
    )
}