import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../types/User.ts";
import {Avatar} from "@mui/material";

type SignUpPageProps={
    fetchUser: ()=>void;
}
export default function SignUpPage(props: Readonly<SignUpPageProps>){
    const [formData, setFormData]=useState<User>({username: ''});
    const [homeGym, setHomeGym]=useState<string>("");
    const [holds, setHolds]=useState<string[]>([]);
    const [styles, setStyles]=useState<string[]>([]);
    const [avatarURL, setAvatarURl]=useState<string>("");

    useEffect(showAvatar, []);
    function showAvatar(){
        axios.get("/api/auth/myAvatar")
            .then(response => setAvatarURl(response.data));
    }

    function handleOnSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        axios.post("/api/user/create", formData)
            .then(props.fetchUser);
    }

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            username: value,
        }));
    }

    const handleChangeFullName = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            fullName: value,
        }));
    }


    return(
        <div>
            <p>Hi!</p>
            <p>Create your new profile</p>
            <Avatar alt="Remy Sharp" src={avatarURL} />
            <form onSubmit={handleOnSubmit}>
                <label> Username:
                    <input type={"text"} id={"username"} name={"username"} value={formData.username} onChange={handleChangeUsername} required/>
                </label>
                <label> Full name:
                    <input type={"text"} id={"fullName"} name={"fullName"} value={formData.fullName} onChange={handleChangeFullName}/>
                </label>

                <p>homeGym, selectField</p>
                <p>holds, selectField</p>
                <p>styles, selectField</p>
            </form>
        </div>
    )
}