import {
    Avatar,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    styled,
    TextField
} from "@mui/material";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {User} from "../types/User.ts";
import {Gym, Hold, Style} from "../types/enums.ts";
import {useNavigate} from "react-router-dom";
import "./FormComponent.css";

type FormComponentProps = {
    fetchUser: () => void;
    user: User;
    path: string;
    formTarget: string;
}
export default function FormComponent(props: Readonly<FormComponentProps>) {
    const [avatarUrl, setAvatarUrl] = useState<string>("");
    const [formData, setFormData] = useState<User>({username: props.user.username, fullName: props.user.fullName, homeGym: props.user.homeGym, favoriteHolds: props.user.favoriteHolds, favoriteStyles: props.user.favoriteStyles});
    const [homeGym, setHomeGym] = useState<string>(props.user.homeGym || "");
    const [holds, setHolds] = useState<string[]>(props.user.favoriteHolds || []);
    const [styles, setStyles] = useState<string[]>(props.user.favoriteStyles || []);
    const navigate = useNavigate();
    const optionalGyms = Object.values(Gym);
    const optionalHolds = Object.values(Hold);
    const optionalStyles = Object.values(Style);

    useEffect(showAvatar, []);

    function showAvatar() {
        axios.get("/api/auth/myAvatar")
            .then(response => setAvatarUrl(response.data));
    }

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post("/api/user/" + props.formTarget, formData)
            .then(() => {
                props.fetchUser();
                navigate(props.path);
            });
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

    const ValidationTextField = styled(TextField)({
        '& input:valid + fieldset': {
            borderColor: '#E0E3E7',
            borderWidth: 1,
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 1,
        },
        '& input:valid:focus + fieldset': {
            borderWidth: 1,
            padding: '4px !important',
        },
    });

    return (
        <div className={"formComponent"}>
            <Avatar alt="Remy Sharp" src={avatarUrl}/>
            <form onSubmit={handleOnSubmit}>
                <ValidationTextField sx={{m: 1, width: 300}}
                                     id={"username"} label={"Username"} variant={"outlined"} value={formData.username}
                                     onChange={handleChangeUsername} size={"small"} required/>
                <br/>
                <TextField sx={{m: 1, width: 300}}
                           id={"fullName"} label={"Full name"} variant={"outlined"} value={formData.fullName}
                           onChange={handleChangeFullName} size={"small"}/>
                <br/>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel>Home gym</InputLabel>
                    <Select value={homeGym} onChange={changeHomeGym} input={<OutlinedInput label="Home gym"/>}
                            size={"small"}>
                        {optionalGyms.map(gym =>
                            <MenuItem key={gym} value={gym}>
                                {gym}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel>Favorite holds</InputLabel>
                    <Select multiple value={holds} onChange={changeFavoriteHolds}
                            input={<OutlinedInput label="Favorite holds"/>} size={"small"}
                            renderValue={(selected) => (
                                selected.map((value) => (
                                    <Chip key={value} label={value} size={"small"}/>
                                ))
                            )}>
                        {optionalHolds.map(hold =>
                            <MenuItem key={hold} value={hold}>
                                {hold}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <FormControl sx={{m: 1, width: 300}}>
                    <InputLabel>Favorite styles</InputLabel>
                    <Select multiple value={styles} onChange={changeFavoriteStyles}
                            input={<OutlinedInput label="Favorite styles"/>} size={"small"}
                            renderValue={(selected) => (
                                selected.map((value) => (
                                    <Chip key={value} label={value} size={"small"}/>
                                ))
                            )}>
                        {optionalStyles.map(style =>
                            <MenuItem key={style} value={style}>
                                {style}
                            </MenuItem>
                        )}
                    </Select>
                </FormControl>
                <br/>
                <Button type={"submit"} variant={"contained"} size={"small"}>
                    Save
                </Button>
            </form>

        </div>
    )
}