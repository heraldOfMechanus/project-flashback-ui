
import {RegisterUserRequest} from "../dtos/register-user-request";
import {useState} from "react";
import {registerNewUser} from "../remote/user-service";
import {makeStyles} from "@material-ui/core/styles";

import {Button, Container, FormControl, Grid, InputLabel} from '@material-ui/core';
import { Link, Redirect } from "react-router-dom";
import ErrorMessageComponent from "./ErrorMessage";

interface IRegisterProps{
    currentUser: RegisterUserRequest | undefined

}


function RegisterComponent(props: IRegisterProps){
    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: 'lightskyblue',
            paddingTop: '1rem',
            paddingBottom: '2rem',
            borderRadius: '.7rem',
            borderStyle: 'solid',
            borderColor: 'royalblue',
        },
        button: {
            backgroundColor: 'lightseagreen',
            marginTop: '1rem',
        },
        field: {
            marginBottom: '.5rem',
        }
    }));

    const classes = useStyles();

    let [firstName, setfirstName] = useState('')
    let [lastName, setlastName] = useState('')
    let [email, setemail] = useState('')
    let [username, setusername] = useState('')
    let [password, setpassword] = useState('')
    let regClicked = false;

    let [errorMessage, setErrorMessage] = useState('');

    function updatefirstName(e:any){
        console.log(e.currentTarget.value)
        setfirstName(e.currentTarget.value)
    }
    function updatelastName(e:any){
        console.log(e.currentTarget.value)
        setlastName(e.currentTarget.value)
    }
    function updateemail(e:any){
        console.log(e.currentTarget.value)
        setemail(e.currentTarget.value)
    }
    function updateusername(e:any){
        console.log(e.currentTarget.value)
        setusername(e.currentTarget.value)
    }
    function updatepassword(e:any){
        console.log(e.currentTarget.value)
        setpassword(e.currentTarget.value)
    }

    async function register(){
        console.log("Register button clicked")
        try {
            if(firstName && lastName && email && username && password){

                setErrorMessage('')
                regClicked = true;

                let request = await registerNewUser({firstName, lastName, email, username, password})
                console.log(RegisterUserRequest)



            }else {
                regClicked = false;
                setErrorMessage('You must fill in all the fields.');
            }
        } catch (e: any) {
            setErrorMessage('User already registered');
            console.log(e.message);
            }
        }

    return(
        !(firstName && lastName && username && email && password && regClicked)
        ?
        <>
            <Container className={classes.root} maxWidth='sm'>
                <Grid
                    direction="column"
                    spacing={10}
                >
                    <Grid item>
                        <h1>Register Page</h1>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="firstName-input">First Name</InputLabel>
                            <input id="firstName-input" type="text" onChange={updatefirstName} />
                            <br/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="lastName-input">Last Name</InputLabel>
                            <input id="lastName-input" type="text" onChange={updatelastName} />
                            <br/>
                        </FormControl>
                    </Grid>
                    <Grid item></Grid>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="email-input">Email</InputLabel>
                            <input id="email-input" type="text" onChange={updateemail} />
                            <br/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="username-input">Username</InputLabel>
                            <input id="username-input" type="text:" onChange={updateusername} />
                            <br/>
                        </FormControl>
                    </Grid>              
                    <Grid item>
                        <FormControl className={classes.field}>
                            <InputLabel htmlFor="password-input">Password</InputLabel>
                            <input id="password-input" type="password" onChange={updatepassword} />
                            <br/>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button className={classes.button} onClick={register}>Register</Button>
                    </Grid>
            </Container>
            { errorMessage ? <ErrorMessageComponent  errorMessage = {errorMessage} /> : <></> }
        </>
        :
        <Redirect to="/" />
    )
}

export default RegisterComponent;