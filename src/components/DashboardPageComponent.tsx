import React, { useState, useEffect } from "react";
import { Principal } from "../dtos/Principal";
import ErrorMessageComponent from "./ErrorMessage";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {getProfilePicture} from '../remote/user-service'
import {Avatar, Icon, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText} from "@material-ui/core";
import classes from "*.module.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import PeopleIcon from '@material-ui/icons/People';
import GamesOutlinedIcon from '@material-ui/icons/GamesOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';

interface IDashboardComponent {
    currentUser: Principal | undefined;
    setCurrentUser: (nextUser: Principal | undefined) => void;
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


    return (
        <>
            <h1>WELCOME, {props.currentUser?.firstName.toUpperCase()}  {props.currentUser?.lastName.toUpperCase()}  </h1>
            <img src={pfp}></img>
            <br/>
            <List className={classes.root}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <GamesOutlinedIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Total Score" secondary= {props.currentUser?.totalScore}/>
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AlternateEmailIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Email" secondary={props.currentUser?.email} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                           <PersonOutlinedIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Username" secondary={props.currentUser?.username} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <EventAvailableOutlinedIcon/>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Member Since" secondary={props.currentUser?.registrationDate} />
                </ListItem>
            </List>
        </>
    )
}

export default DashboardComponent;