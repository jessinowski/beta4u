import {Button, Collapse} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommentCard from "./CommentCard.tsx";
import {User} from "../types/User.ts";
import {Boulder} from "../types/Boulder.ts";
import {ChangeEvent, useEffect, useState} from "react";
import {UserComment} from "../types/UserComment.ts";
import axios from "axios";

type CommentComponentProps={
    boulder: Boulder;
    fetchData: ()=>void;
    user: User;
}

export default function CommentComponent(props: Readonly <CommentComponentProps>){
    const [expanded, setExpanded] = useState<boolean>(false);
    const [newComment, setNewComment]=useState<string>("");
    const [boulderComments, setBoulderComments]=useState<UserComment[]>([]);

    function openComments() {
        setExpanded(!expanded);
    }

    useEffect(fetchComments, [props.boulder]);
    function fetchComments(){
        axios.get("/api/boulders/comments/" + props.boulder.id)
            .then(response => setBoulderComments(response.data));
    }

    function handleComment(event: ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        setNewComment(value);
    }

    function saveComment() {
        axios.post("/api/comments/create/" + props.boulder.id, newComment, {headers:{'Content-Type': 'text/plain'}})
            .then(props.fetchData);
    }

    return(
        <div>
            <Button onClick={openComments}>
                {boulderComments ? boulderComments.length : 0} Comments
                <ExpandMoreIcon/>
            </Button>
            <Collapse in={expanded}>
                {boulderComments.map(comment =>  <CommentCard comment={comment}/>)}
            </Collapse>
            <form onSubmit={saveComment}>
                <label>Create comment:
                   <textarea value={newComment} onChange={handleComment}/>
                </label>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    )
}