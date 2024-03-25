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

export default function Header() {
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
        <AppBar position={"static"}>
            <div className={"navigationBar"}>
                    <IconButton onClick={()=>navigate("/home")}>
                        <HomeIcon />
                    </IconButton>
                    <div>beta4u</div>
                    <div>
                        <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                            <Avatar alt="userPicture"/>
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

                            <MenuItem onClick={()=>handleCloseUserMenu("/profile")}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={()=>handleCloseUserMenu("/profile/favorites")}>
                                Favorites
                            </MenuItem>
                            <MenuItem onClick={()=>handleCloseUserMenu("/profile/tops")}>
                                Tops
                            </MenuItem>
                            <MenuItem onClick={()=>handleCloseUserMenu("/profile/flashes")}>
                                Flashes
                            </MenuItem>
                            <MenuItem onClick={()=>handleCloseUserMenu("/profile/projects")}>
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