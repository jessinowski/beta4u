import "./LoginPage.css";
import {Avatar, Button} from "@mui/material";
import github_catLogo from "../assets/github-mark.png";
import beta4u_logo from "../assets/beta4u_logo2.png";

export default function LoginPage(){

    function login() {
        const host = window.location.host === "localhost:5173" ? "http://localhost:8080" : window.location.origin
        window.open(host + "/oauth2/authorization/github", "_self")
    }
    return(
        <div className={"loginPage"}>
            <div className={"loginBox"}>
                <img className={"beta4u_logo"} alt={"beta4u_logo"} src={beta4u_logo}/>
{/*                <div className={"loginGreeting"}>
                    Hi!
                    <br/>
                    Welcome
                </div>*/}
                <Button className={"loginButton"} variant={"outlined"} onClick={login}
                        startIcon={<Avatar className={"loginIcon"} alt="Remy Sharp" src={github_catLogo}/>}> Login with
                    Github</Button>
            </div>
        </div>
    )
}