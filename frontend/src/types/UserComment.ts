import {User} from "./User.ts";

export type UserComment={
    id?: string;
    content: string;
    user: User;
    date: string;
}