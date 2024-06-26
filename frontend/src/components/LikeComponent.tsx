import {Boulder} from "../types/Boulder.ts";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import "./LikeComponent.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {User} from "../types/User.ts";


type LikeComponentProps={
    boulder: Boulder;
    fetchData: ()=>void;
    user: User;
}
export default function LikeComponent(props: Readonly<LikeComponentProps>){
    const [checked, setChecked]=useState<boolean>(false);

    useEffect(getFavorites, [props.boulder]);
    function getFavorites(){
        axios.get<Boulder[]>("/api/user/favorites")
            .then(response => {
                const favoriteBoulder = response.data.find(b => b.id === props.boulder.id);
                setChecked(favoriteBoulder !== undefined);
            });
    }

    function handleChange() {
        axios.put("/api/user/favorites/"+props.boulder.id)
            .then(getFavorites);
    }

    return(
        <Checkbox checked={checked}  onClick={handleChange} icon={<FavoriteBorder className={"emptyIcon"} />} checkedIcon={<Favorite className={"heartIconChecked"} />}/>
    )
}