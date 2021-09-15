import { useState } from "react";
import { Principal } from "../dtos/Principal";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {authenticate} from '../remote/auth-service'
import {Button, Container, FormControl, Grid, InputLabel, Typography} from "@material-ui/core";
import { Redirect } from "react-router-dom";


interface ILoginProps {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
}



function LoginComponent(props: ILoginProps) {


    const useStyles = makeStyles((theme) => ({
        //Where banana is, this can named whatever you want.
        root: {
            backgroundColor: 'lightskyblue',
            paddingTop: '1rem',
            paddingBottom: '2rem',
            borderRadius: '.7rem',
            borderStyle: 'solid',
            borderColor: 'royalblue',
        },
        button: {
            color: 'white',
            backgroundColor: 'steelblue',
            marginTop: '1rem',
            borderRadius: '.5rem',
            borderStyle: 'solid',
            borderColor: 'royalblue',
        },
        field: {
            marginTop: '.5rem',
        }
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
                setErrorMessage('You must give a valid username and password.');
            }
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }

    return (
        !props.currentUser?.id
        ?
        <>
            {/*make sure to set class name here( from useStyles) to take affect on the page*/}
            <Container className={classes.root} maxWidth='sm'>
                <Grid
                direction="column"
                spacing={10}
                >
                    <Grid item>
                        <Typography variant='h2'>Login</Typography>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="username-input">Username</InputLabel>
                            <input id="username-input" type="text" onChange={updateUsername} />
                            <br/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="password-input">Password</InputLabel>
                            <input id="password-input" type="password" onChange={updatePassword} />
                            <br/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} onClick={login}>Log in!</Button>
                    </Grid>
                </Grid>
            </Container>
            { errorMessage ? <ErrorMessageComponent  errorMessage = {errorMessage} /> : <></> }

        </>
        :
        <Redirect to="/" />
    )
}

export default LoginComponent;