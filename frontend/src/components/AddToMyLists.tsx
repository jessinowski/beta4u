import {IconButton, Menu, MenuItem} from "@mui/material";
import {PostAdd} from "@mui/icons-material";
import {useState} from "react"
import {Boulder} from "../types/Boulder.ts";

type AddToMyListProps={
    boulder: Boulder;
}
export default function AddToMyList(props: Readonly<AddToMyListProps>){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return(
        <div>
            <IconButton onClick={handleClick}>
                <PostAdd />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Flash</MenuItem>
                    <MenuItem onClick={handleClose}>Top</MenuItem>
                    <MenuItem onClick={handleClose}>Project</MenuItem>
            </Menu>
        </div>
    )
}