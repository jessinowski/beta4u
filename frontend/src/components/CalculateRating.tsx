import {Boulder} from "../types/Boulder.ts";
import {Rating} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';

type CalculateRatingProps = {
    boulder: Boulder;
    fetchData: () => void;
}
export default function CalculateRating(props: Readonly<CalculateRatingProps>) {
    const [myRating, setMyRating] = useState<number>(0);

    function calculateAverageRating(): number {
        const sumUpRating = props.boulder.ratings
            .map(rating => rating.ratingPoints)
            .reduce((a, b) => a + b, 0);
        return sumUpRating / props.boulder.ratings.length
    }

    function handleSelectStars(_: SyntheticEvent<Element, Event>, value: number | null) {
        if (value !== 0 && value !== null) {
            setMyRating(value);
            axios.put("/api/boulders/changeRating/" + props.boulder.id, value)
                .then(props.fetchData);
        }
    }

    return (
        <div>
            <div>
                {calculateAverageRating()} <StarIcon/>
            </div>
            <Rating name={"half-rating"} value={myRating} onChange={handleSelectStars} precision={0.5}/>
        </div>
    )
}