import FormComponent from "../components/FormComponentProps";
import {User} from "../types/User.ts";

type EditProfileProps={
    fetchUser: ()=>void;
    user: User;
}
export default function EditProfile(props: Readonly<EditProfileProps>){
    return(
        <div>
            <p>Edit your profile here</p>
            <FormComponent fetchUser={props.fetchUser} user={props.user} path={"/profile"}/>
        </div>
    )
}