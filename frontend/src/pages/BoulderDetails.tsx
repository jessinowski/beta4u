import {Boulder} from "../types/Boulder.ts";
import {useParams} from "react-router-dom";
import {Card, CardContent, CardMedia, Chip} from "@mui/material";
import RatingSystem from "../components/RatingSystem.tsx";
import {User} from "../types/User.ts";
import LikeComponent from "../components/LikeComponent.tsx";
import "./BoulderDetails.css";
import AddToMyList from "../components/AddToMyLists.tsx";
import {Color, Gym, Hold, Level, Style} from "../types/enums.ts";
import "../components/BoulderCard.css";

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
        <div className={"cards"}>{boulder ?
            <Card className={"card"}>
                <p>{boulder.date}</p>
                <RatingSystem boulder={boulder} fetchData={props.fetchData} user={props.user}/>
                <CardMedia
                    component="img"
                    image={"/" + boulder.imagePath}
                    alt="boulder-image"
                />
                <CardContent>
                    <LikeComponent boulder={boulder} fetchData={props.fetchData} user={props.user}/>
                    <div className={"chipDivs"}>Holds: {boulder.holds.map(hold => <Chip className={"chip"} key={hold} label={Hold[hold as keyof typeof Hold]}
                                                               size={"small"}/>)}</div>
                    <div className={"chipDivs"}>Styles: {boulder.styles.map(style => <Chip className={"chip"} key={style} label={Style[style as keyof typeof Style]}
                                                                  size={"small"}/>)}</div>
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