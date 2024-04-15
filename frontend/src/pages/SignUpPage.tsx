import FormComponent from "../components/FormComponent";
import {User} from "../types/User.ts";

type SignUpPageProps={
    user:User;
    fetchUser: (actionToCall? : () => void)=>void;
}

export default function SignUpPage(props: Readonly<SignUpPageProps>){

    return(
        <div className={"pages"}>
            <p>Hi!</p>
            <p>Create your new profile</p>
            <FormComponent user={props.user} fetchUser={props.fetchUser} path={"/"} formTarget={"create"}/>
        </div>
    )
}