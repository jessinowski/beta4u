import CommentCard from "./CommentCard.tsx";
import {User} from "../types/User.ts";
import {Boulder} from "../types/Boulder.ts";
import {ChangeEvent, useState} from "react";
import {UserComment} from "../types/UserComment.ts";
import axios from "axios";
import "./CommentComponent.css";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import {IconButton} from "@mui/material";

type CommentComponentProps={
    boulder: Boulder;
    fetchData: ()=>void;
    user: User;
    boulderComments: UserComment[];
}

export default function CommentComponent(props: Readonly <CommentComponentProps>){

    const [newComment, setNewComment]=useState<string>("");


    function handleComment(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        setNewComment(value);
    }

    function saveComment() {
        axios.post("/api/comments/create/" + props.boulder.id, newComment, {headers:{'Content-Type': 'text/plain'}})
            .then(props.fetchData);
    }

    return(
        <div >
                <form  onSubmit={saveComment}>
                    <TextField className={"newComment"} label={"Add a comment"} multiline value={newComment} onChange={handleComment}/>
                    <IconButton type={"submit"}><SendIcon/></IconButton>
                </form>
                {props.boulderComments.map(comment => <CommentCard comment={comment} boulder={props.boulder}
                                                             fetchData={props.fetchData}/>)}
        </div>
    )
}