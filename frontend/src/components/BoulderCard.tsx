import {Card, CardActionArea, CardContent, CardMedia} from "@mui/material";
import {Boulder} from "../types/Boulder.ts";
import "./BoulderCard.css"
import CalculateRating from "./CalculateRating.tsx";

type BoulderCardProps={
    boulder: Boulder;
    fetchData: ()=>void;
}
export default function BoulderCard(props: Readonly<BoulderCardProps>){

    return(
        <div className={"cards"}>
            <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={props.boulder.imagePath}
                        alt="boulder-image"
                    />
                    <CardContent>
                        <p>{<CalculateRating boulder={props.boulder} fetchData={props.fetchData}/>}</p>
                        <p>{props.boulder.level}</p>
                        <p>{props.boulder.gym}</p>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>

    )
}