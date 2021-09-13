import { useState, useEffect } from "react";
import { Principal } from "../dtos/Principal";
import ErrorMessageComponent from "./ErrorMessage";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {getProfilePicture} from '../remote/user-service'
import {Avatar, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import classes from "*.module.css";

interface IDashboardComponent {
    currentUser: Principal | undefined;
    setCurrentUser: (nextUser: Principal | undefined) => void;
}

function WorkIcon() {
    return null;
}

function BeachAccessIcon() {
    return null;
}

function DashboardComponent(props: IDashboardComponent) {

    const[pfp, setPfp] = useState('');
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                width: '100%',
                maxWidth: 360,
                backgroundColor: theme.palette.background.paper,
            },
        }),
    );
    const classes = useStyles()

    useEffect(() => {
        let displayProfilePicture = async () => {
            try{
                if(props.currentUser){
                    setPfp(await getProfilePicture(props.currentUser.username, 300));
                } else {
                    setPfp(await getProfilePicture("undefined", 100));
                }
            } catch (e: any){
                console.log(e.message);
            }
        }
        displayProfilePicture();
    }, []);

    // @ts-ignore
    return (
        <>
            <h1>WELCOME, {props.currentUser?.firstName.toUpperCase()}  {props.currentUser?.lastName.toUpperCase()}  </h1>
            <img src={pfp}></img>
            <br/>
            <List className={classes.root}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>

                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Total Score" secondary= {props.currentUser?.totalScore}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={props.currentUser?.email} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BeachAccessIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Username" secondary={props.currentUser?.username} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BeachAccessIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Member Since" secondary="July 20, 2014" />
                </ListItem>
            </List>
        </>
    )
}

export default DashboardComponent;