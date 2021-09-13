import { useState, useEffect } from "react";
import { Principal } from "../dtos/Principal";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {getProfilePicture} from '../remote/user-service'

interface IDashboardComponent {
    currentUser: Principal | undefined;
    setCurrentUser: (nextUser: Principal | undefined) => void;
}

function DashboardComponent(props: IDashboardComponent) {

    const[pfp, setPfp] = useState('');

    useEffect(() => {
        let displayProfilePicture = async () => {
            try{
                if(props.currentUser){
                    setPfp(await getProfilePicture(props.currentUser.username, 200));
                } else {
                    setPfp(await getProfilePicture("undefined", 100));
                }
            } catch (e: any){
                console.log(e.message);
            }
        }
        displayProfilePicture();
    }, []);

    return (
        <>
            <h1>Welcome, {props.currentUser?.username} </h1>
            <img src={pfp}></img>
        </>
    )
}

export default DashboardComponent;