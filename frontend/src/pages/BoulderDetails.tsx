import {Boulder} from "../types/Boulder.ts";
import {useParams} from "react-router-dom";
import {Card, CardActionArea, CardContent, CardMedia, Chip} from "@mui/material";
import RatingSystem from "../components/RatingSystem.tsx";
import {User} from "../types/User.ts";
import LikeComponent from "../components/LikeComponent.tsx";


type BoulderDetailsProps={
    boulders: Boulder[];
    fetchData: ()=>void;
    user: User;
}
export default function BoulderDetails(props: Readonly<BoulderDetailsProps>){
    const params= useParams();
    const boulder = props.boulders.find(boulder=> boulder.id === params.id);

    return(
        <div>Boulder details
            {boulder ?
                <Card className={"card"}>
                        <CardActionArea>
                            <p>{<LikeComponent boulder={boulder} fetchData={props.fetchData} user={props.user}/>}</p>
                            <p>{<RatingSystem boulder={boulder} fetchData={props.fetchData} user={props.user}/>}</p>
                            <CardMedia
                                component="img"
                                height="140"
                                image={boulder.imagePath}
                                alt="boulder-image"
                            />
                            <CardContent>
                                <p>Holds: {boulder.holds.map(hold => <Chip key={hold} label={hold} size={"small"}/>)}</p>
                                <p>Styles: {boulder.styles.map(style => <Chip key={style} label={style} size={"small"}/>)}</p>
                                <p>{boulder.date}</p>
                                <p>Level: {boulder.level}</p>
                                <p>Gym: {boulder.gym}</p>
                                <p>Sector: {boulder.sector}</p>
                                <p>Routesetter: {boulder.routesetter}</p>
                                <p>Color: {boulder.color}</p>
                            </CardContent>
                        </CardActionArea>
                </Card> :
                <>No boulder found</>
            }
        </div>
    )
}