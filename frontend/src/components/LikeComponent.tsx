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
}
export default function LikeComponent(props: Readonly<LikeComponentProps>){
    const [checked, setChecked]=useState<boolean>(false);

    useEffect(getFavorites, [props.boulder]);
    function getFavorites(){
        axios.get<Boulder[]>("/api/user/myFavorites")
            .then(response => {
                const favoriteBoulder = response.data.find(b => b.id === props.boulder.id);
                setChecked(favoriteBoulder !== undefined);
            });
    }

    function handleChange() {
        axios.put("/api/user/changeFavorites/"+props.boulder.id)
            .then(getFavorites);
    }

    return(
        <Checkbox checked={checked}  onClick={handleChange} icon={<FavoriteBorder className={"heartIcon"} />} checkedIcon={<Favorite className={"heartIconChecked"} />}/>
    )
}