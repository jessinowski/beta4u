import FormComponent from "../components/FormComponent.tsx";
import {User} from "../types/User.ts";
import "./EditProfile.css";

type EditProfileProps={
    fetchUser: ()=>void;
    user: User;
}
export default function EditProfile(props: Readonly<EditProfileProps>){
    return(
        <div className={"pages"}>
            <div className={"editProfile"}>
                <p className={"editProfile_text"}>Edit your profile here</p>
                <FormComponent fetchUser={props.fetchUser} user={props.user} path={"/profile"} formTarget={"edit"}/>
            </div>
        </div>
    )
}