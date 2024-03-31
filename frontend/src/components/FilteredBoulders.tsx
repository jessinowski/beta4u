import {Boulder} from "../types/Boulder.ts";
import {User} from "../types/User.ts";
import BoulderCard from "./BoulderCard.tsx";
import {Accordion, AccordionDetails, AccordionSummary, Autocomplete, TextField} from "@mui/material";
import {useState} from "react";
import {Color, Gym, Hold, Level, Style} from "../types/enums.ts";
import "./FilteredBoulders.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type FilteredBouldersProps={
    boulders: Boulder[];
    fetchData: ()=>void;
    user: User;
}

export default function FilteredBoulders(props: Readonly<FilteredBouldersProps>){
    const [searchLevel, setSearchLevel]=useState<string>("");
    const [searchGym, setSearchGym]=useState<string>("");
    const [searchSector, setSearchSector]=useState<string>("");
    const [searchColor, setSearchColor]=useState<string>("");
    const [searchHold, setSearchHold]=useState<string>("");
    const [searchStyle, setSearchStyle]=useState<string>("");
    const [searchRoutesetter, setSearchRoutesetter]=useState<string>("");

    const optLevels = Object.values(Level);
    const optGyms = Object.values(Gym);
    const optSectors = props.boulders.map(boulder => boulder.sector);
    const optColors = Object.values(Color);
    const optHolds = Object.values(Hold);
    const optStyles = Object.values(Style);
    const optRoutesetters = props.boulders.map(boulder => boulder.routesetter);

    const newestBoulders = props.boulders.sort((a,b)=> {return new Date(b.date).getTime() - new Date(a.date).getTime()});

    const filteredBoulders= newestBoulders.filter(
        (boulder) =>
            boulder.level.toString().includes(searchLevel) &&
            boulder.gym.toString().includes(searchGym) &&
            boulder.sector.toString().includes(searchSector) &&
            boulder.color.toString().includes(searchColor) &&
            boulder.holds.toString().includes(searchHold) &&
            boulder.styles.toString().includes(searchStyle) &&
            boulder.routesetter.toString().includes(searchRoutesetter)
    );

    return (
        <div>
            <Accordion className={"searchAccordion"}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    Set filter
                </AccordionSummary>
                <AccordionDetails className={"searchForm"}>
                    <Autocomplete className={"searchField"}
                        disablePortal
                        size="small"
                        options={optLevels}
                        onInputChange={(_e, value) => setSearchLevel(value)}
                        renderInput={(params) => <TextField {...params} label="Level"/>}/>
                    <Autocomplete className={"searchField"}
                        disablePortal
                        size="small"
                        options={optGyms}
                        onInputChange={(_e, value) => setSearchGym(value)}
                        renderInput={(params) => <TextField {...params} label="Gym"/>}/>
                    <Autocomplete className={"searchField"}
                        disablePortal
                        size="small"
                        options={optSectors}
                        onInputChange={(_e, value) => setSearchSector(value)}
                        renderInput={(params) => <TextField {...params} label="Sector"/>}/>
                    <Autocomplete className={"searchField"}
                        disablePortal
                        size="small"
                        options={optColors}
                        onInputChange={(_e, value) => setSearchColor(value)}
                        renderInput={(params) => <TextField {...params} label="Color"/>}/>
                    <Autocomplete className={"searchField"}
                        disablePortal
                        size="small"
                        options={optHolds}
                        onInputChange={(_e, value) => setSearchHold(value)}
                        renderInput={(params) => <TextField {...params} label="Hold"/>}/>
                    <Autocomplete className={"searchField"}
                        disablePortal
                        size="small"
                        options={optStyles}
                        onInputChange={(_e, value) => setSearchStyle(value)}
                        renderInput={(params) => <TextField {...params} label="Style"/>}/>
                    <Autocomplete className={"searchField"}
                        disablePortal
                        size="small"
                        options={optRoutesetters}
                        onInputChange={(_e, value) => setSearchRoutesetter(value)}
                        renderInput={(params) => <TextField {...params} label="Routesetter"/>}/>
                </AccordionDetails>
            </Accordion>
            <div>
                {filteredBoulders.map(boulder => <BoulderCard
                    key={boulder.id}
                    boulder={boulder}
                    fetchData={props.fetchData}
                    user={props.user}/>)}
            </div>
        </div>
    )
}
