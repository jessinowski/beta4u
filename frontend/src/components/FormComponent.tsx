import {
    Alert,
    Avatar,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../types/User.ts";
import {Gym, Hold, Style} from "../types/enums.ts";
import {useNavigate} from "react-router-dom";
import "./FormComponent.css";

type FormComponentProps = {
    user: User;
    path: string;
    formTarget: string;
    fetchUser: (actionToCall? : () => void)=>void;
}
export default function FormComponent(props: Readonly<FormComponentProps>) {
    const [allUsers, setAllUsers]=useState<User[]>([]);
    const [alert, setAlert] = useState<boolean | null>(null);
    const [formData, setFormData] = useState<User>(props.user ? {username: props.user.username, fullName: props.user.fullName, homeGym: props.user.homeGym, favoriteHolds: props.user.favoriteHolds, favoriteStyles: props.user.favoriteStyles} : {username: '', homeGym: ''});
    const [homeGym, setHomeGym] = useState<string>(props.user ? props.user.homeGym : "");
    const [holds, setHolds] = useState<string[]>(props.user.favoriteHolds ? props.user.favoriteHolds : []);
    const [styles, setStyles] = useState<string[]>(props.user.favoriteStyles ? props.user.favoriteStyles : []);
    const navigate = useNavigate();
    const optionalGyms = Object.entries(Gym);
    const optionalHolds = Object.entries(Hold);
    const optionalStyles = Object.entries(Style);

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if(alert) {
            axios.post("/api/user/" + props.formTarget, formData)
                .then(() => {
                    props.fetchUser(() => {navigate(props.path)});
                });
            }
        }

    useEffect(getAllUsers, []);
    function getAllUsers(){
        axios.get("/api/user/all")
            .then(response => setAllUsers(response.data))
    }

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (allUsers.filter(user => user.username === value).length !== 0){
            setAlert(false);
        } else {
            setAlert(true);
        }
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

    function changeHomeGym(event: SelectChangeEvent<typeof homeGym>) {
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

    return (
        <div className={"formComponent"}>
            <Avatar className={"formPicture"} alt="profile_picture" src={props.user.imagePath}/>
            <form className={"form"} onSubmit={handleOnSubmit}>
                    <TextField title={"TEST"} sx={{m: 1, width: 300}}
                               id={"username"} label={"Username"} variant={"outlined"} value={formData.username}
                               onChange={handleChangeUsername} size={"small"} required/>
                {alert === false &&  <Alert severity="error">Username already exists.</Alert>}
                {alert === true &&  <Alert severity="success">Username is available.</Alert>}

                    <br/>
                    <TextField sx={{m: 1, width: 300}}
                               id={"fullName"} label={"Full name"} variant={"outlined"} value={formData.fullName}
                               onChange={handleChangeFullName} size={"small"}/>
                    <FormControl required sx={{m: 1, width: 300}}>
                        <InputLabel className={"label"} size={"small"}>Home gym</InputLabel>
                        <Select value={homeGym} onChange={changeHomeGym} input={<OutlinedInput label="Home gym"/>}
                                size={"small"}>
                            {optionalGyms.map(([value,label]) =>
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{m: 1, width: 300}}>
                        <InputLabel className={"label"} size={"small"}>Favorite holds</InputLabel>
                        <Select multiple value={holds} onChange={changeFavoriteHolds}
                                input={<OutlinedInput label="Favorite holds"/>} size={"small"}
                                renderValue={(selected) => (
                                    selected.map((value) => (
                                        <Chip className={"chip"} key={value} label={Hold[value as keyof typeof Hold]} size={"small"}/>
                                    ))
                                )}>
                            {optionalHolds.map(([value, label]) =>
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl sx={{m: 1, width: 300}}>
                        <InputLabel className={"label"} size={"small"}>Favorite styles</InputLabel>
                        <Select multiple value={styles} onChange={changeFavoriteStyles}
                                input={<OutlinedInput label="Favorite styles"/>} size={"small"}
                                renderValue={(selected) => (
                                    selected.map((value) => (
                                        <Chip className={"chip"} key={value} label={Style[value as keyof typeof Style]} size={"small"}/>
                                    ))
                                )}>
                            {optionalStyles.map(([value, label]) =>
                                <MenuItem key={value} value={value}>
                                    {label}
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <Button className={"saveButton"} type={"submit"} variant={"contained"} size={"small"}>
                        Save
                    </Button>
            </form>
        </div>
    )
}