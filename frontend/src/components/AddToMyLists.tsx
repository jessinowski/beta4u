import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import {useEffect, useState} from "react"
import {Boulder} from "../types/Boulder.ts";
import axios from "axios";
import "./AddToMyLists.css";

type AddToMyListProps={
    boulder: Boulder;
}
export default function AddToMyList(props: Readonly<AddToMyListProps>){
    const [open, setOpen] = useState(false);
    const [list, setList]=useState<string>("");

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        axios.put("/api/user/change-lists/" + props.boulder.id, event.target.value, {headers:{'Content-Type': 'text/plain'}});
        setList(event.target.value);
    };

    useEffect(checkMyLists, [props.boulder.id]);

    function checkMyLists(){
        axios.get("/api/user/check-lists/" + props.boulder.id)
            .then(response => setList(response.data));
    }

    return(
        <div>
            <FormControl className={"addButton"}>
                <InputLabel>Add to</InputLabel>
                <Select className={"addItems"} size={"small"}
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    value={list}
                    label="Add to"
                    onChange={handleChange}
                >
                    <MenuItem className={"menuItem"} value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem className={"menuItem"} value={"flashes"}>Flash</MenuItem>
                    <MenuItem className={"menuItem"} value={"tops"}>Top</MenuItem>
                    <MenuItem className={"menuItem"} value={"projects"}>Project</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}