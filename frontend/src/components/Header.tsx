import {
    AppBar,
    Avatar,
    Divider,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import {useState} from "react";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";
import "./Header.css";
import {User} from "../types/User.ts";

type HeaderProps={
    user: User;
}
export default function Header(props: Readonly<HeaderProps>) {
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (page: string) => {
        setAnchorElUser(null);
        navigate(page);
    };

    function logout() {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080' : window.location.origin

        window.open(host + '/logout', '_self')
    }

    return (
        <AppBar className={"header"} position={"static"}>
            <div className={"navigationBar"}>
                    <IconButton onClick={()=>navigate("/")}>
                        <HomeIcon className={"homeButton"} />
                    </IconButton>
                    <div className={"appName"}>beta4u</div>
                    <div>
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt={"my_picture"} src={props.user.imagePath}/>
                        </IconButton>
                        <Menu
                            sx={{mt: '45px'}}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >

                            <MenuItem onClick={()=>handleCloseUserMenu(`/profile/${props.user.id}`)}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={()=>handleCloseUserMenu(`/profile/${props.user.id}/favorites`)}>
                                Favorites
                            </MenuItem>
                            <MenuItem onClick={()=>handleCloseUserMenu(`/profile/${props.user.id}/tops`)}>
                                Tops
                            </MenuItem>
                            <MenuItem onClick={()=>handleCloseUserMenu(`/profile/${props.user.id}/flashes`)}>
                                Flashes
                            </MenuItem>
                            <MenuItem onClick={()=>handleCloseUserMenu(`/profile/${props.user.id}/projects`)}>
                                Projects
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={logout}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
        </AppBar>

    )
}