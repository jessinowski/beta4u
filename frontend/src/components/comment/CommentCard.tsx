import {UserComment} from "../../types/UserComment.ts";
import axios from "axios";
import {Boulder} from "../../types/Boulder.ts";
import "./CommentCard.css";
import {Avatar, Divider, IconButton} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {format} from "date-fns";
import {User} from "../../types/User.ts";

type CommentCardProps={
    comment: UserComment;
    boulder: Boulder;
    fetchData: ()=>void;
    user: User;
}
export default function CommentCard(props: Readonly<CommentCardProps>){


    function handleDelete(){
        axios.delete("/api/comments/" + props.comment.id + "/" + props.boulder.id)
            .then(props.fetchData);
    }

    return(
        <div>
            <Divider className={"divider"}/>
            <div className={"commentCard"}>
                <div className={"commentPicInfo"}>
                    <Avatar className={"usersAvatar"} alt={"users_picture"} src={props.comment.user.imagePath}/>
                    <div className={"comment"}>
                        <div className={"commentHeader"}>
                            <p>{props.comment.user.username}</p>
                            <p>{format(props.comment.date, "dd.mm.yyyy HH:mm")}</p>
                        </div>
                        <p className={"contentOfComment"}>{props.comment.content}</p>
                    </div>
                </div>
                {props.user.id === props.comment.user.id &&
                    <IconButton onClick={handleDelete}>
                        <DeleteForeverIcon className={"deleteButton"}/>
                    </IconButton>}
            </div>
        </div>
    )
}