import React from 'react';
import { Link } from "react-router-dom";
import { Principal } from "../dtos/Principal";
import { ButtonBase, AppBar, Toolbar, Drawer, 
    List, Typography, CssBaseline, Divider, 
    IconButton, makeStyles, useTheme, ListItem,
    ListItemIcon } from '@material-ui/core';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LoginIcon from '@mui/icons-material/Login';
import { Leaderboard } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ForumIcon from '@material-ui/icons/Forum';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ClearAllRoundedIcon from '@material-ui/icons/ClearAllRounded';
import {Alert} from "@mui/material";

interface INavbarProps {
    currentUser:Principal|undefined,
    setCurrentUser: (nextUser: Principal | undefined) => void;
}

export function SideBarComponent(props: INavbarProps) {
    
    function logout() {
        props.setCurrentUser(undefined);
    }

    const drawerWidth = 240;

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            textAlign: "center",
        },
        alert: {
            textAlign: 'center',
            width: '30%',
            alignItems: 'center',
            marginLeft: '29rem'

        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },        
    }));

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    
    return (
        <>
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <ButtonBase component={Link} to='/'>
                            <OfflineBoltIcon />
                            <Typography variant="h6" noWrap>                            
                                Flashback
                            </Typography>
                        </ButtonBase>
                        {props.currentUser
                            ?
                            ''
                            :
                            <Alert className={classes.alert} variant="filled" severity="info">
                                You must be signed in to play the trivia game!
                            </Alert>

                        }
                    </Toolbar>

                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    <Divider/>
                    <List>
                        {
                        props.currentUser
                        ?
                            <>                                    
                                <ListItem button onClick={logout} component = {Link} to={'/'}>
                                    <ListItemIcon><LogoutIcon/></ListItemIcon>
                                    <Typography color="inherit" variant="h6">Logout</Typography>
                                </ListItem>  
                                <ListItem button component={Link} to={'/dashboard'}>
                                    <ListItemIcon><DashboardIcon/></ListItemIcon>
                                    <Typography color="inherit" variant="h6">Dashboard</Typography>
                                </ListItem>
                           
                            </>
                        :
                            <>
                                <ListItem button component={Link} to={'/login'}> 
                                    <ListItemIcon><LoginIcon/></ListItemIcon>
                                    <Typography color="inherit" variant="h6">Login</Typography>
                                </ListItem>
                                <ListItem button component={Link} to={'/register'}>
                                    <ListItemIcon><AppRegistrationIcon/></ListItemIcon>
                                    <Typography color="inherit" variant="h6">Register</Typography>
                                </ListItem>                                    
                            </>
                        }                        
                    </List>
                    <List>
                        <ListItem button component={Link} to={'/trivia'}> 
                            <ListItemIcon><CreditCardIcon/></ListItemIcon>
                            <Typography color="inherit" variant="h6">Trivia</Typography>
                        </ListItem>
                        <ListItem button component={Link} to={'/forum'}> 
                            <ListItemIcon><ForumIcon/></ListItemIcon>
                            <Typography color="inherit" variant="h6">Forum</Typography>

                        </ListItem>
                        <ListItem button component={Link} to={'/leaderboards'}>
                        <ListItemIcon><Leaderboard/></ListItemIcon>
                        <Typography color="inherit" variant="h6">Leaderboard</Typography>
                    </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Typography paragraph>
                    </Typography>
                    <Typography paragraph>

                    </Typography>
                </main>
            </div>
        </>
    );
}
