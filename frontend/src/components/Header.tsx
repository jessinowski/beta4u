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

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

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

                            <MenuItem onClick={handleCloseUserMenu}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                Favorites
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                Tops
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                Flashes
                            </MenuItem>
                            <MenuItem onClick={handleCloseUserMenu}>
                                Projects
                            </MenuItem>
                            <Divider/>
                            <MenuItem onClick={handleCloseUserMenu}>
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
        </AppBar>

    )
}