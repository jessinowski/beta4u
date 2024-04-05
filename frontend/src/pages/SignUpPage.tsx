import FormComponent from "../components/FormComponent.tsx";

type SignUpPageProps={
    fetchUser: ()=>void;
}
export default function SignUpPage(props: Readonly<SignUpPageProps>){

    return(
        <div>
            <p>Hi!</p>
            <p>Create your new profile</p>
            <FormComponent fetchUser={props.fetchUser} path={"/home"} formTarget={"create"}/>
        </div>
    )
}