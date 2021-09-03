import { useState } from "react";
import { Principal } from "../dtos/Principal";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {authenticate} from '../remote/auth-service'


interface ILoginProps {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
}



function LoginComponent(props: ILoginProps) {


    const useStyles = makeStyles((theme) => ({
        //Where banana is, this can named whatever you want.
        banana: {
            textAlign: "center",
            color: "blue",
        },

    }));
    const classes = useStyles();

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [errorMessage, setErrorMessage] = useState('');

    function updateUsername(e: any) {
        setUsername(e.currentTarget.value);
    }

    function updatePassword(e: any) {
        setPassword(e.currentTarget.value);
    }

    async function login() {
        console.log('Login button clicked! Form values: ', username, password);

        try {
            if (username && password) {
                let principal = await authenticate({username, password});
                console.log(principal);
                localStorage.setItem('app-state', JSON.stringify(principal));
                props.setCurrentUser(principal);
            } else {
                setErrorMessage('provide actual data, dumbass');
            }
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }

    return (
        <>
            {/*make sure to set class name here( from useStyles) to take affect on the page*/}
            <div className={classes.banana}>
                <input id="username-input" type="text" onChange={updateUsername} />
                <br/><br/>
                <input id="password-input" type="text:" onChange={updatePassword} />
                <br/><br/>
                <button id="login-btn" onClick={login}>Log in!</button>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent  errorMessage = {errorMessage} /> : <></> }
            </div>
            <div className={classes.banana}>
                Jose Tejada
            </div>
        </>
    )
}

export default LoginComponent;