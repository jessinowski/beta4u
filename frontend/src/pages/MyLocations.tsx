import {Status, Wrapper} from "@googlemaps/react-wrapper";
import LocationMap from "../components/LocationMap.tsx";


export default function MyLocations(){
    const render = (status: Status) => {
        return <h1>{status}</h1>;
    };

    return(
        <Wrapper apiKey={"AIzaSyDg8rz5pjhK5qblkqpKvrADltAAuYrQCnk"} render={render}>
            <LocationMap/>
        </Wrapper>
    )
}