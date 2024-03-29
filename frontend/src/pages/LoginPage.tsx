import "./LoginPage.css";
import {Avatar, Button} from "@mui/material";
import github_catLogo from "../assets/github-mark.png";
import {User} from "../types/User.ts";

type LoginPageProps={
    user: User | null | undefined;
}
export default function LoginPage(props: Readonly<LoginPageProps>){

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")
    }
    return(
        <div className={"login"}>
            <div className={"loginGreeting"}>
                Hi!
                <br/>
                Welcome
            </div>
            {props.user === null &&
                <Button className={"loginButton"} variant={"outlined"} onClick={login} startIcon={<Avatar alt="Remy Sharp" src={github_catLogo} />}> Login with Github</Button>}
        </div>
    )
}