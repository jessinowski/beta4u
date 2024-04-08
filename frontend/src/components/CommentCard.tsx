import {UserComment} from "../types/UserComment.ts";
import axios from "axios";
import {Boulder} from "../types/Boulder.ts";
import "./CommentCard.css";
import {Divider, IconButton} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {format} from "date-fns";

type CommentCardProps={
    comment: UserComment;
    boulder: Boulder;
    fetchData: ()=>void;
}
export default function CommentCard(props: Readonly<CommentCardProps>){


    function handleDelete(){
        axios.delete("/api/comments/" + props.comment.id + "/" + props.boulder.id)
            .then(props.fetchData);
    }

    return(
        <div className={"comment"}>
            <Divider className={"divider"}/>
            <div className={"commentHeader"}>
                <p>{props.comment.user.username}</p>
                <p>{format(props.comment.date, "dd.mm.yyyy HH:mm")}</p>
            </div>
            <p className={"contentOfComment"}>{props.comment.content}</p>
            <IconButton onClick={handleDelete}>
                <DeleteForeverIcon className={"deleteButton"}/>
            </IconButton>
        </div>
    )
}