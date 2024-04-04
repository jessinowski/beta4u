import {UserComment} from "../types/UserComment.ts";

type CommentCardProps={
    comment: UserComment;
}
export default function CommentCard(props: Readonly<CommentCardProps>){
    return(
        <div>
            <p>{props.comment.user.username}</p>
            <p>{props.comment.date}</p>
            <p>{props.comment.content}</p>
        </div>
    )
}