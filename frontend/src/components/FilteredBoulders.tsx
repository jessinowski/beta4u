import {Boulder} from "../types/Boulder.ts";
import {User} from "../types/User.ts";
import BoulderCard from "./BoulderCard.tsx";
import {Autocomplete, TextField} from "@mui/material";
import {useState} from "react";
import {Color, Gym, Hold, Level, Routesetter, Sector, Style} from "../types/enums.ts";

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
    const optSectors = Object.values(Sector);
    const optColors = Object.values(Color);
    const optHolds = Object.values(Hold);
    const optStyles = Object.values(Style);
    const optRoutesetters = Object.values(Routesetter);

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
            <div>
                <Autocomplete
                    disablePortal
                    options={optLevels}
                    onInputChange={(_e, value) => setSearchLevel(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose level"/>}/>
                <Autocomplete
                    disablePortal
                    options={optGyms}
                    onInputChange={(_e, value) => setSearchGym(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose gym"/>}/>
                <Autocomplete
                    disablePortal
                    options={optSectors}
                    onInputChange={(_e, value) => setSearchSector(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose sector"/>}/>
                <Autocomplete
                    disablePortal
                    options={optColors}
                    onInputChange={(_e, value) => setSearchColor(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose color"/>}/>
                <Autocomplete
                    disablePortal
                    options={optHolds}
                    onInputChange={(_e, value) => setSearchHold(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose hold"/>}/>
                <Autocomplete
                    disablePortal
                    options={optStyles}
                    onInputChange={(_e, value) => setSearchStyle(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose style"/>}/>
                <Autocomplete
                    disablePortal
                    options={optRoutesetters}
                    onInputChange={(_e, value) => setSearchRoutesetter(value)}
                    sx={{m: 1, width: 300}}
                    renderInput={(params) => <TextField {...params} label="Choose routesetter"/>}/>
            </div>
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
