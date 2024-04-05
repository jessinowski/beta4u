import {Boulder} from "../types/Boulder.ts";
import {useParams} from "react-router-dom";
import {Card, CardContent, CardMedia, Chip} from "@mui/material";
import RatingSystem from "../components/RatingSystem.tsx";
import {User} from "../types/User.ts";
import LikeComponent from "../components/LikeComponent.tsx";
import "./BoulderDetails.css";
import AddToMyList from "../components/AddToMyLists.tsx";
import {Color, Gym, Hold, Level, Style} from "../types/enums.ts";


type BoulderDetailsProps={
    boulders: Boulder[];
    fetchData: ()=>void;
    user: User;
    fetchUser: ()=>void;
}
export default function BoulderDetails(props: Readonly<BoulderDetailsProps>){
    const params= useParams();
    const boulder = props.boulders.find(boulder=> boulder.id === params.id);

    return(
        <div>{boulder ?
            <Card className={"card"}>
                <p>{boulder.date}</p>
                <LikeComponent boulder={boulder} fetchData={props.fetchData} user={props.user}/>
                <RatingSystem boulder={boulder} fetchData={props.fetchData} user={props.user}/>
                <CardMedia
                    component="img"
                    height="140"
                    image={boulder.imagePath}
                    alt="boulder-image"
                />
                <CardContent>
                    <p>Holds: {boulder.holds.map(hold => <Chip key={hold} label={Hold[hold as keyof typeof Hold]}
                                                               size={"small"}/>)}</p>
                    <p>Styles: {boulder.styles.map(style => <Chip key={style} label={Style[style as keyof typeof Style]}
                                                                  size={"small"}/>)}</p>
                    <p>Level: {Level[boulder.level as keyof typeof Level]}</p>
                    <p>Gym: {Gym[boulder.gym as keyof typeof Gym]}</p>
                    <p>Sector: {boulder.sector}</p>
                    <p>Routesetter: {boulder.routesetter}</p>
                    <p>Color: {Color[boulder.color as keyof typeof Color]}</p>
                </CardContent>
                <AddToMyList boulder={boulder}/>
            </Card> :
            <>No boulder found</>
            }
        </div>
    )
}