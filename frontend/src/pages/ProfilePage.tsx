import {useNavigate, useParams} from "react-router-dom";
import {AppBar, IconButton, Tab, Tabs} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MapIcon from '@mui/icons-material/Map';
import {User} from "../types/User.ts";
import "./ProfilePage.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import {useEffect, useState} from "react";
import MyBoulderList from "../components/MyBoulderList.tsx";
import MyLocations from "../components/MyLocations.tsx";

type ProfilePageProps={
    user: User;
}

export default function ProfilePage(props: Readonly <ProfilePageProps>){
    const navigate = useNavigate();
    const {tabName} =useParams();
    const [value, setValue] = useState<string>(tabName || "projects");

    useEffect(() => {
        if (tabName) setValue(tabName);
    }, [tabName]);

    const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
        navigate("/profile/"+newValue);
    };

    let activeComponent;
    switch(value){
        case "favorites": {
            activeComponent = <MyBoulderList user={props.user} listType={"favorites"}/>;
            break;
        }
        case "flashes": {
            activeComponent = <MyBoulderList user={props.user} listType={"flashes"}/>;
            break;
        }
        case "tops": {
            activeComponent = <MyBoulderList user={props.user} listType={"tops"} />;
            break;
        }
        case "projects": {
            activeComponent = <MyBoulderList user={props.user} listType={"projects"}/>;
            break;
        }
        case "locations": {
            activeComponent = <MyLocations user={props.user}/>;
            break;
        }
    }

    return (
        <div>
            <div className={"profileHeader"}>
                <div className={"profilePicInfo"}>
                    <img className={"profilePicture"} alt={"my_picture"} src={props.user.imagePath}/>
                    <div className={"profileText"}>
                        <p className={"profileName"}>{props.user.username}</p>
                        <p className={"profileInfo"}>{props.user.homeGym}</p>
                    </div>
                </div>

                <div className={"profileButtons"}>
                    <IconButton onClick={() => navigate("/editProfile")}><ManageAccountsIcon/></IconButton>
                    <IconButton onClick={() => navigate("/profile/locations")}><MapIcon/></IconButton>
                </div>
            </div>
            <div className={"selectListBar"}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="action tabs example"
                    >
                        <Tab icon={<FavoriteBorderIcon/>} label="Favorites" value={"favorites"}/>
                        <Tab icon={<ElectricBoltIcon/>} label="Flashes" value={"flashes"}/>
                        <Tab icon={<CheckCircleOutlineIcon/>} label="Tops" value={"tops"}/>
                        <Tab icon={<SquareFootIcon/>} label="Projects" value={"projects"}/>
                    </Tabs>
                </AppBar>
            </div>
            {activeComponent}
        </div>
    )
}