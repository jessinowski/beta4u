import {Boulder} from "../types/Boulder.ts";
import {User} from "../types/User.ts";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import "./LikeComponent.css";


type LikeComponentProps={
    boulder: Boulder;
    fetchData: () => void;
    user: User;
}
export default function LikeComponent(props: Readonly<LikeComponentProps>){
    return(
        <Checkbox icon={<FavoriteBorder className={"heartIcon"} />} checkedIcon={<Favorite className={"heartIconChecked"} />}/>
    )
}