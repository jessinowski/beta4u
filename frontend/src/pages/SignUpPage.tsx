import FormComponent from "../components/FormComponent.tsx";
import {User} from "../types/User.ts";

type SignUpPageProps={
    fetchUser: ()=>void;
    user: User;
}
export default function SignUpPage(props: Readonly<SignUpPageProps>){

    return(
        <div>
            <p>Hi!</p>
            <p>Create your new profile</p>
            <FormComponent fetchUser={props.fetchUser} user={props.user} path={"/home"} formTarget={"create"}/>
        </div>
    )
}