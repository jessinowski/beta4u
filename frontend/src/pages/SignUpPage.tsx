import FormComponent from "../components/FormComponent";
import {User} from "../types/User.ts";
import "./SignUpPage.css";

type SignUpPageProps={
    user:User;
    fetchUser: (actionToCall? : () => void)=>void;
}

export default function SignUpPage(props: Readonly<SignUpPageProps>){

    return(
        <div className={"pages"}>
            <div className={"signUpPage"}>
                <div className={"signUpGreeting"}>
                    <div>Hi, welcome!</div>
                    <div>Create your new profile</div>
                </div>
                <FormComponent user={props.user} fetchUser={props.fetchUser} path={"/"} formTarget={"create"}/>
            </div>
        </div>
    )
}