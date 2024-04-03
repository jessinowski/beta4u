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
        axios.put("/api/user/change-lists/" + props.boulder.id, event.target.value)
            .then(() => getBoulderLists(event.target.value));
        setList(event.target.value);
    };

    function getBoulderLists(value: string){
        axios.get<Boulder[]>("/api/user/" + value)
            .then(response => {
                const addedBoulder = response.data.find(b => b.id === props.boulder.id)
            if(addedBoulder !== undefined){
                setList(value);
            } else {
                setList("");
            }}
            );
    }

    return(
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>Add to</InputLabel>
                <Select
                    open={open}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    value={list}
                    label="Add to"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"flashes"}>Flash</MenuItem>
                    <MenuItem value={"tops"}>Top</MenuItem>
                    <MenuItem value={"projects"}>Project</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}