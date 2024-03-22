import {Boulder} from "../types/Boulder.ts";
import {Rating} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import axios from "axios";

type CalculateRatingProps={
    boulder: Boulder;
    fetchData: ()=>void;
}
export default function CalculateRating(props: Readonly<CalculateRatingProps>){
    const [currentRating, setCurrentRating] = useState(calculateAverageRating);

    function calculateAverageRating(): number{
        const sumUpRating = props.boulder.ratings
            .map(rating => rating.ratingPoints)
            .reduce((a,b)=> a+b, 0);
        return sumUpRating/props.boulder.ratings.length
    }

    function handleSelectStars(_: SyntheticEvent<Element, Event>,value: number | null) {
        if(value !== null){
            setCurrentRating(value);
            axios.put("/api/boulders/changeRating/"+ props.boulder.id, {ratingPoints: currentRating})
                .then(props.fetchData);
        }
    }

    return(
        <Rating name={"half-rating"} value={calculateAverageRating()} onChange={handleSelectStars} precision={0.5}/>
    )
}