import {Boulder} from "../types/Boulder.ts";
import BoulderCard from "../components/BoulderCard.tsx";
import {User} from "../types/User.ts";

type HomepageProps={
    user: User;
    boulders: Boulder[];
    fetchData: ()=>void;
}
export default function Homepage(props: Readonly<HomepageProps>){

    return(
        <div>
            {props.boulders.map(boulder => <BoulderCard key={boulder.id} boulder={boulder} fetchData={props.fetchData} user={props.user}/>)}
        </div>)
}