import { useState } from "react";
import { Principal } from "../dtos/Principal";
import ErrorMessageComponent from "./ErrorMessage";


interface ILoginProps {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
}

function LoginComponent(props: ILoginProps) {
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
        console.log('Login button clicked! Form valus: ', username, password);

        let credentials = {
            username: username,
            password: password
        }

        // TODO: Put Axios logic here! For now, this is vestigial!
    }

    return (
        <>
            <div>
                <input id="username-input" type="text" onChange={updateUsername} />
                <br/><br/>
                <input id="password-input" type="text:" onChange={updatePassword} />
                <br/><br/>
                <button id="login-btn" onClick={login}>Log in!</button>
                <br/><br/>
                { errorMessage ? <ErrorMessageComponent errorMessage = {errorMessage} /> : <></> }
            </div>
        </>
    )
}

export default LoginComponent;