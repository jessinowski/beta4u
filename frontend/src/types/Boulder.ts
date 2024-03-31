import {UserComment} from "./UserComment.ts";
import {Rating} from "./Rating.ts";

export type Boulder={
    id: string;
    imagePath: string;
    videoPath: string;
    level: string;
    sector: string;
    gym: string;
    date: string;
    comments: UserComment[];
    ratings: Rating[];
    routesetter: string;
    color: string;
    holds: string[];
    styles: string[];
}