import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../types/User.ts";
import {Avatar, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Gym, Hold, Style} from "../types/enums/gym.ts";

type SignUpPageProps={
    fetchUser: ()=>void;
}
export default function SignUpPage(props: Readonly<SignUpPageProps>){
    const [formData, setFormData]=useState<User>({username: ''});
    const [homeGym, setHomeGym]=useState<string>("");
    const [holds, setHolds]=useState<string[]>([]);
    const [styles, setStyles]=useState<string[]>([]);
    const [avatarUrl, setAvatarUrl]=useState<string>("");
    const navigate =useNavigate();
    const optionalGyms=Object.values(Gym);
    const optionalHolds=Object.values(Hold);
    const optionalStyles=Object.values(Style);

    useEffect(showAvatar, []);
    function showAvatar(){
        axios.get("/api/auth/myAvatar")
            .then(response => setAvatarUrl(response.data));
    }

    function handleOnSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        axios.post("/api/user/create", formData)
            .then(props.fetchUser);
        navigate("/home");
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

    function changeHomeGym(event: SelectChangeEvent<typeof homeGym>){
        const value = event.target.value;
        setHomeGym(value);
        setFormData((prevData) => ({
            ...prevData,
            homeGym: value,
        }));
    }
    function changeFavoriteHolds(event: SelectChangeEvent<typeof holds>) {
        const value = event.target.value;
        const updatedHolds = typeof value === 'string' ? value.split(',') : value;
        setHolds(updatedHolds);
        setFormData((prevData) => ({
            ...prevData,
            favoriteHolds: updatedHolds,
        }));
    }

    function changeFavoriteStyles(event: SelectChangeEvent<typeof styles>) {
        const value = event.target.value;
        const updatedStyles = typeof value === 'string' ? value.split(',') : value;
        setStyles(updatedStyles);
        setFormData((prevData) => ({
            ...prevData,
            favoriteStyles: updatedStyles,
        }));
    }


    return(
        <div>
            <p>Hi!</p>
            <p>Create your new profile</p>
            <Avatar alt="Remy Sharp" src={avatarUrl} />
            <form onSubmit={handleOnSubmit}>
                <label> Username: <input type={"text"} id={"username"} name={"username"} value={formData.username}
                           onChange={handleChangeUsername} required/>
                </label>
                <br/>
                <label> Full name: <input type={"text"} id={"fullName"} name={"fullName"} value={formData.fullName}
                           onChange={handleChangeFullName}/>
                </label>
                <br/>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel>Home gym</InputLabel>
                    <Select
                        value={homeGym}
                        onChange={changeHomeGym}
                        input={<OutlinedInput label="Home gym"/>}
                    >
                        {optionalGyms.map(gym =>
                            <MenuItem
                                key={gym}
                                value={gym}
                            >
                                {gym}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel>Favorite holds</InputLabel>
                    <Select
                        multiple
                        value={holds}
                        onChange={changeFavoriteHolds}
                        input={<OutlinedInput label="Favorite holds"/>}
                    >
                        {optionalHolds.map(hold =>
                            <MenuItem
                                key={hold}
                                value={hold}
                            >
                                {hold}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel>Favorite styles</InputLabel>
                    <Select
                        multiple
                        value={styles}
                        onChange={changeFavoriteStyles}
                        input={<OutlinedInput label="Favorite styles"/>}
                    >
                        {optionalStyles.map(style =>
                            <MenuItem
                                key={style}
                                value={style}
                            >
                                {style}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <button type={"submit"}>Sign up</button>
            </form>
        </div>
    )
}