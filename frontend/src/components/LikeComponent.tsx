import {Boulder} from "../types/Boulder.ts";
import {User} from "../types/User.ts";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import "./LikeComponent.css";
import {useEffect, useState} from "react";
import axios from "axios";


type LikeComponentProps={
    boulder: Boulder;
    fetchData: () => void;
    user: User;
    fetchUser: () => void;
}
export default function LikeComponent(props: Readonly<LikeComponentProps>){
    const [favorites, setFavorites]=useState<Boulder[]>([]);
    const initialState = favorites.includes(props.boulder);
    console.log(initialState);
    console.log(favorites);
    const [checked, setChecked]=useState<boolean>(initialState || false);

    useEffect(getFavorites, [checked]);
    function getFavorites(){
        axios.get("/api/user/myFavorites")
            .then(response=>setFavorites(response.data));
    }

    function handleChange() {
        axios.put("/api/user/changeFavorites/"+props.boulder.id, props.boulder)
            .then(props.fetchUser);
        setChecked(!checked);
    }

    return(
        <Checkbox checked={checked}  onClick={handleChange} icon={<FavoriteBorder className={"heartIcon"} />} checkedIcon={<Favorite className={"heartIconChecked"} />}/>
    )
}