import {Outlet, useNavigate} from "react-router-dom";
import {IconButton} from "@mui/material";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import MapIcon from '@mui/icons-material/Map';

export default function ProfilePage(){
    const navigate=useNavigate();

    return (
        <div>
            My Profile
            <IconButton onClick={()=>navigate("/editProfile")}><ManageAccountsIcon/></IconButton>
            <IconButton onClick={()=>navigate("/profile/locations")}><MapIcon/></IconButton>
            <Outlet/>
        </div>
    )
}