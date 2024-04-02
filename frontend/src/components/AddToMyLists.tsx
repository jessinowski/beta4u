import {IconButton, Menu, MenuItem, NativeSelect} from "@mui/material";
import {PostAdd} from "@mui/icons-material";
import {FormEventHandler, MouseEventHandler, useState} from "react"
import {Boulder} from "../types/Boulder.ts";
import axios from "axios";

type AddToMyListProps={
    boulder: Boulder;
}
export default function AddToMyList(props: Readonly<AddToMyListProps>){
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [isFlash, setIsFlash]=useState<boolean>(false);
    const [isTop, setIsTop]=useState<boolean>(false);
    const [isProject, setIsProject]=useState<boolean>(false);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function getBoulderLists(value: string){
        axios.get<Boulder[]>("/api/user/" + value)
            .then(response => {
                const addedBoulder = response.data.find(b => b.id === props.boulder.id);
                switch(value){
                    case "flashes":{
                        setIsFlash(addedBoulder !== undefined);
                        break;
                    }
                    case "tops":{
                        setIsTop(addedBoulder !== undefined);
                        break;
                    }
                    case "projects":{
                        setIsProject(addedBoulder !== undefined);
                        break;
                    }
                }
            })
    }
    function handleChange(value: string){
        return axios.put("/api/user/" + value + "/" + props.boulder.id)
            .then(getBoulderLists(value));
    }

    return(
        <div>
            <IconButton onClick={handleClick}>
                <PostAdd />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <NativeSelect>
                    <option value={"flashes"} >Flash</option>
                    <option value={"tops"}>Top</option>
                    <option value={"projects"}>Project</option>
                </NativeSelect>
            </Menu>
        </div>
    )
}