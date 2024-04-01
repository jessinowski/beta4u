import {Boulder} from "../types/Boulder.ts";
import {User} from "../types/User.ts";
import FilteredBoulders from "../components/FilteredBoulders.tsx";

type HomepageProps={
    user: User;
    boulders: Boulder[];
    fetchData: ()=>void;
}
export default function Homepage(props: Readonly<HomepageProps>){

    return(
        <div>
            <FilteredBoulders boulders={props.boulders} fetchData={props.fetchData} user={props.user}/>
        </div>
    )
}