import {Boulder} from "../types/Boulder.ts";
import {useParams} from "react-router-dom";
import {Card, CardContent, CardMedia, Chip, Collapse, Divider} from "@mui/material";
import RatingSystem from "../components/RatingSystem.tsx";
import {User} from "../types/User.ts";
import LikeComponent from "../components/LikeComponent.tsx";
import "./BoulderDetails.css";
import AddToMyList from "../components/AddToMyLists.tsx";
import CommentComponent from "../components/CommentComponent.tsx";
import {Color, Gym, Hold, Level, Style} from "../types/enums.ts";
import "../components/BoulderCard.css";
import CardActions from '@mui/material/CardActions';
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import {useEffect, useState} from "react";
import {UserComment} from "../types/UserComment.ts";
import axios from "axios";
import {format} from "date-fns";


type BoulderDetailsProps={
    boulders: Boulder[];
    fetchData: ()=>void;
    user: User;
    fetchUser: ()=>void;
}
export default function BoulderDetails(props: Readonly<BoulderDetailsProps>){
    const params= useParams();
    const boulder = props.boulders.find(boulder=> boulder.id === params.id);
    const [expanded, setExpanded] = useState<boolean>(false);
    const [boulderComments, setBoulderComments]=useState<UserComment[]>([]);

    useEffect(fetchComments, [boulder]);
    function fetchComments(){
        if(boulder){
            axios.get("/api/boulders/comments/" + boulder.id)
                .then(response => setBoulderComments(response.data));
        }
    }

    function openComments() {
        setExpanded(!expanded);
    }


    return(
        <div className={"pages"}>
        <div className={"cards"}>
            {boulder ?
            <Card className={"card"}>
                <RatingSystem boulder={boulder} fetchData={props.fetchData} user={props.user}/>
                <CardMedia
                    component="img"
                    image={"/" + boulder.imagePath}
                    alt="boulder-image"
                />
                <CardContent>
                    <div className={"cardButtons"}>
                        <LikeComponent boulder={boulder} fetchData={props.fetchData} user={props.user}/>
                        <AddToMyList boulder={boulder}/>
                    </div>


                    <div className={"detailsHeader"}>
                        <div>{Gym[boulder.gym as keyof typeof Gym]}</div>
                        <div>Sector: {boulder.sector}</div>
                    </div>
                    <Divider className={"divider"}/>
                    <div className={"chipDivs"}>
                        {boulder.holds.map(hold => <Chip className={"chip"} key={hold}
                                                         label={Hold[hold as keyof typeof Hold]}
                                                         size={"small"}/>)}
                        {boulder.styles.map(style => <Chip className={"chip"} key={style}
                                                           label={Style[style as keyof typeof Style]}
                                                           size={"small"}/>)}
                    </div>
                    <div className={"details"}>
                        <div>Level:</div>
                        {Level[boulder.level as keyof typeof Level]}
                    </div>
                    <div className={"details"}>
                        <div>Color:</div>
                        {Color[boulder.color as keyof typeof Color]}
                    </div>
                    <div className={"details"}>
                        <div>Routesetter:</div>
                        {boulder.routesetter}
                    </div>
                    <div className={"details"}>
                        <div>Date:</div>
                        {format(boulder.date, "dd.MM.yyyy")}
                    </div>

                </CardContent>
                <CardActions className={"openComments"}>
                    <ChatRoundedIcon onClick={openComments}>
                        <p>{boulderComments ? boulderComments.length : 0}</p>
                    </ChatRoundedIcon>
                </CardActions>
                <Collapse in={expanded} timeout={"auto"} unmountOnExit>
                    <CommentComponent boulder={boulder} fetchData={props.fetchData} user={props.user}
                                      boulderComments={boulderComments}/>
                </Collapse>
            </Card> :
            <>No boulder found</>
            }
        </div>
        </div>
    )
}