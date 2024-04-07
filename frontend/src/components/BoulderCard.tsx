import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import {Boulder} from "../types/Boulder.ts";
import "./BoulderCard.css"
import RatingSystem from "./RatingSystem.tsx";
import {User} from "../types/User.ts";
import {Link} from "react-router-dom";
import LikeComponent from "./LikeComponent.tsx";
import {Gym, Level} from "../types/enums.ts";

type BoulderCardProps={
    boulder: Boulder;
    fetchData: ()=>void;
    user: User;
}
export default function BoulderCard(props: Readonly<BoulderCardProps>){

    return(
        <div className={"cards"}>
            <Card className={"card"}>
                <Link to={`/boulder/${props.boulder.id}`}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.boulder.imagePath}
                            alt="boulder-image"
                        />
                        <CardContent>
                            <LikeComponent boulder={props.boulder}/>
                            <RatingSystem boulder={props.boulder} fetchData={props.fetchData} user={props.user}/>
                            <p>{Gym[props.boulder.gym as keyof typeof Gym]}</p>
                            <p>Level: {Level[props.boulder.level as keyof typeof Level]}</p>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>
    )
}