import {UserComment} from "../types/UserComment.ts";
import axios from "axios";
import {Boulder} from "../types/Boulder.ts";
import "./CommentCard.css";

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
            <div className={"commentHeader"}>
                <p>{props.comment.user.username}</p>
                <p>{props.comment.date}</p>
            </div>
            <p>{props.comment.content}</p>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}