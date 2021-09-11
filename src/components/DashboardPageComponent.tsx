import { useState } from "react";
import { Principal } from "../dtos/Principal";
import ErrorMessageComponent from "./ErrorMessage";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, InputLabel} from "@material-ui/core";
// import {getProfilePicture} from '../remote/user-service'

interface IDashboardComponent {
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
}

function DashboardComponent(props: IDashboardComponent) {

    // let un: string;
    // let isDefined: boolean;

    // async function displayProfilePicture() {

    //     let pfp: any;

    //     if(props.currentUser){
    //         un = props.currentUser.username;
    //         isDefined = true;
    //     } else {
    //         isDefined = false;
    //     }
        
    //     console.log(isDefined);
    //     if(isDefined){
    //         pfp = await getProfilePicture(un, 200);
    //     }

    //     console.log(pfp.url);
    //     return pfp;
    
    // }

    return (
        <>
            <h1>Welcome, {props.currentUser?.username} </h1>
            <img src={`https://picsum.photos/seed/${props.currentUser?.username}/200`} />
        </>
    )
}

export default DashboardComponent;