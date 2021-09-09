
import {RegisterUserRequest} from "../dtos/register-user-request";
import {useState} from "react";
import {registerNewUser} from "../remote/user-service";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel} from '@material-ui/core';

interface IRegisterProps{
    currentUser: RegisterUserRequest | undefined

}


function RegisterComponent(props: IRegisterProps){
    const useStyles = makeStyles((theme) => ({
        //Where banana is, this can be named whatever you want.
        banana: {
            textAlign: "center",
            color: "blue",
        },

    }));

    const classes = useStyles();

    let [firstName, setfirstName] = useState('')
    let [lastName, setlastName] = useState('')
    let [email, setemail] = useState('')
    let [username, setusername] = useState('')
    let [password, setpassword] = useState('')

    function updatefirstName(e:any){
        setfirstName(e.currentTarget.value)
    }
    function updatelastName(e:any){
        setlastName(e.currentTarget.value)
    }
    function updateemail(e:any){
        setemail(e.currentTarget.value)
    }
    function updateusername(e:any){
        setusername(e.currentTarget.value)
    }
    function updatepassword(e:any){
        setpassword(e.currentTarget.value)
    }

    async function register(){
        console.log("Register button clicked")
        try {
            if(firstName && lastName && email && username && password){

                let request = await registerNewUser({firstName, lastName, email, username, password})
                console.log(RegisterUserRequest)


            }else{
                //TODO put error message here
                console.log("Incorrect information")
            }
        }catch (e:any){
            console.log(e.message)
        }
    }

    return(
        <>

            <div  className={classes.banana} >

                <h1>Register Page</h1>
                <FormControl>
                    <InputLabel htmlFor="firstName-input">First Name</InputLabel>
                    <input id="firstName-input" type="text" onChange={updatefirstName} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="lastName-input">Last Name</InputLabel>
                    <input id="lastName-input" type="text" onChange={updatelastName} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="email-input">Email</InputLabel>
                    <input id="email-input" type="text" onChange={updateemail} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="username-input">Username</InputLabel>
                    <input id="username-input" type="text:" onChange={updateusername} />
                    <br/>
                </FormControl>

                <br/><br/>

                <FormControl>
                    <InputLabel htmlFor="password-input">password</InputLabel>
                    <input id="password-input" type="text" onChange={updatepassword} />
                    <br/>
                </FormControl>

                <br/><br/>
                <button id="Register-btn" onClick={register}>Register!</button>
            </div>




        </>
    )


}

export default RegisterComponent;