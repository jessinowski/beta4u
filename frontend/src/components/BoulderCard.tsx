import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import {Boulder} from "../types/Boulder.ts";
import "./BoulderCard.css"
import RatingSystem from "./RatingSystem.tsx";
import {User} from "../types/User.ts";
import {Link} from "react-router-dom";

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
                            <p>{<RatingSystem boulder={props.boulder} fetchData={props.fetchData} user={props.user}/>}</p>
                            <p>{props.boulder.level}</p>
                            <p>{props.boulder.gym}</p>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </div>

    )
}