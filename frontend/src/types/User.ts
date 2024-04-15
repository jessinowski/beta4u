import {Boulder} from "./Boulder.ts";

export type User={
    id?: string;
    username: string;
    fullName?: string;
    imagePath?: string;
    homeGym: string;
    favoriteHolds?: string[];
    favoriteStyles?: string[];
    myFavorites?: Boulder[];
    myTops?: Boulder[];
    myFlashes?: Boulder[];
    myProjects?: Boulder[];
    newUser?: boolean;
}