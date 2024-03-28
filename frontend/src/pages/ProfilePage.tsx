import {Outlet, useNavigate} from "react-router-dom";
import {Divider, IconButton} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MapIcon from '@mui/icons-material/Map';
import {User} from "../types/User.ts";
import "./ProfilePage.css";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

type ProfilePageProps={
    user: User;
}
export default function ProfilePage(props: Readonly <ProfilePageProps>){
    const navigate=useNavigate();

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
            <Divider />
            <div className={"selectListBar"}>
                <FavoriteBorderIcon/>
                <ElectricBoltIcon/>
                <CheckCircleOutlineIcon/>
                <SquareFootIcon/>
            </div>
            <Divider />

            <Outlet/>
        </div>
    )
}