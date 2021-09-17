import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Modal, useTheme, Typography, CssBaseline, Grid, makeStyles, FormControl, InputLabel, Box, Button, Snackbar, Input } from '@material-ui/core';
import { Alert, ButtonBase } from '@mui/material';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link, Redirect } from 'react-router-dom';
import { Subforum } from '../dtos/Subforum';
import { addNewThread, deleteThread, getAllThreads, updateOldThread } from '../remote/thread-service';
import { Thread } from '../dtos/Thread';
import { Principal } from '../dtos/Principal';
import { ThreadDTO } from '../dtos/ThreadDTO';
import { DeleteOutline, Update } from '@mui/icons-material';
import { wait } from '@testing-library/dom';


interface IForumProps {
    currentTopic: Subforum | undefined
    setCurrentTopic: (nextTopic: Subforum | undefined) => void;
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
    currentThread: Thread | undefined
    setCurrentThread: (nextThread: Thread | undefined) => void;
    value: number
    setValue: (nextNum: number) => void;
}

function ForumComponent(props: IForumProps) {

    let [threads, setThreads] = useState([] as Thread[]);
    let [open, setOpen] = useState(false);
    let [open2, setOpen2] = useState(false);
    let [toastOpen, setToastOpen] = useState(false);
    let [done, setDone] = useState(false);
    let [isAdmin, setAdmin] = useState(false);
    
    let [deletionId, setDeletionId] = useState('');
    let [updateThread, setUpdateThread] = useState(undefined as unknown as Thread);

    // Integer state for forceUpdate function
    let count = 0;
    
    const [formData, setFormData] = useState({
        userId: props.currentUser?.id,
        // @ts-ignore
        subforumId: props.currentTopic?.id,
        threadTitle: '',
        threadContent: '',
    })
    
    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: 'lightskyblue',
            width: '80%',
            paddingBottom: '2rem',
            paddingTop: '1rem',
            borderRadius: '.4rem',
            borderStyle: 'solid',
            borderColor: 'royalblue',
            borderWidth: '.2rem',
        },
        button: {
            backgroundColor: 'cornflowerblue',
            width: '15rem',
            borderRadius: '.7rem',
            borderStyle: 'solid',
            borderColor: 'royalblue',
            marginTop: '1.2rem',
        },
        paper: {
            position: 'absolute',
            top: '30%',
            left: '34%',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        modalButton: {
            justifyContent: 'right',
        },
        threadItem: {
            justifyContent: 'left',
            backgroundColor: 'skyblue',
            textAlign: 'left',
            borderLeftStyle: 'solid',
            borderWidth: '1px',
            borderColor: 'steel',
            borderBottomStyle: 'solid',
            borderTopStyle: 'solid',
        },
        text: {
            paddingLeft: '.2rem',
            color: 'steel',
        },
        snackbar: {
            position: 'absolute',
            top: '-65%',
            left: '30%',
        },
        toastButton: {
            height: '1.5rem',
            marginLeft: '1rem',
            backgroundColor: '#e49b0f',
        }
    }))

    const classes = useStyles();

    // Automatically fetch all threads for user
    useEffect(() => {
        if(!done) {
            fetchThreads();
            setDone(true);
        }
        if(props.currentUser?.role === 'admin') {
            setAdmin(true);
        }
    })

    // Greatly reduces the amount of space spent changing pieces of state by changing one state json.
    let handleChange = (e: any) => {
        const {value} = e.target;
        setFormData({...formData, ["threadTitle"]: value });
        console.log(value);
    }
    let handleChange2 = (e: any) => {
        const {value} = e.target;
        setFormData({...formData, ["threadContent"]: value });
        console.log(value);
    }

    // Get the threads from the database matching this topic
    async function fetchThreads() {
        if(props.currentTopic?.id) {
            let Threads = await getAllThreads({subforumId: props.currentTopic.id});
            console.log(Threads);
            setThreads(Threads);
        } else {
            console.log("The subforum ID is null!");
        }
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function performOpen(req: Thread) {
        setDeletionId(req.id);
        setToastOpen(true);
    }

    // @ts-ignore
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const performOpen2 = async () => {
        setOpen2(true);

        console.log(updateThread);
        // Set the form data to the current update thread.
        // await delay(5000);
        // setFormData({...formData, ["threadTitle"]: updateThread.threadTitle });
        // setFormData({...formData, ["threadContent"]: updateThread.threadContent});
    }

    const performClose2 = () => {
        setOpen2(false);
    }

    function performDelete() {
        console.log(deletionId)
        deleteThread({id: deletionId});
        performClose();
    }

    function performUpdate() {
        if(formData.userId) {
            // @ts-ignore
            let newUpdateThread = new Thread(updateThread.id, formData.userId, formData.subforumId, formData.threadTitle, formData.threadContent);
            if(!newUpdateThread?.threadTitle) {
                newUpdateThread.threadTitle = updateThread.threadTitle;
            }
            if(!newUpdateThread?.threadContent) {
                newUpdateThread.threadContent = updateThread.threadContent;
            }
            console.log(newUpdateThread)
            updateOldThread(newUpdateThread);
            setDone(false);
            performClose2();
        } else {
            console.log('You are not signed in!');
        }
    }

    const performClose = () => {
        setToastOpen(false);
    }

    function newThread() {
        if(formData.threadContent || formData.threadTitle || props.currentTopic?.id) {
            if(!props.currentUser?.id) {
                setFormData({...formData, ["userId"]: 'Anonymous'});
            }
            if(!props.currentTopic?.id) {
                console.log("There was no valid subforum!");
                return;
            }

            // @ts-ignore
            let newThread = new ThreadDTO(formData.userId, formData.subforumId, formData.threadTitle, formData.threadContent)
            addNewThread(newThread);
            handleClose();
            setDone(false);
        }
    }

    // Body of the Modal
    const body = (
        <div className={classes.paper}>
            <Box className={classes.modalButton}>
                <Button onClick={handleClose}>
                    Exit
                </Button>
            </Box>
          <h1>New Thread!</h1>
                <FormControl>
                    <InputLabel htmlFor="title-input">Subject</InputLabel>
                    <Input id="title-input" type="text" onChange={handleChange} />
                    <br/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="content-input">Content</InputLabel>
                    <Input id="content-input" type="text" onChange={handleChange2} />
                    <br/>
                </FormControl>
                <br/>
                <button id="newCard-btn" onClick={newThread}>Submit</button>
        </div>
    );

    const body2 = (
        <div className={classes.paper}>
            <Box className={classes.modalButton}>
                <Button onClick={performClose2}>
                    Exit
                </Button>
            </Box>
          <h1>Update this Thread!</h1>
                <FormControl>
                    <InputLabel htmlFor="title-input">Thread Title</InputLabel>
                    <Input id="title-input" type="text" onChange={handleChange} defaultValue={updateThread?.threadTitle}/> 
                    <br/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="content-input">Content</InputLabel>
                    <Input id="content-input" type="text" onChange={handleChange2} defaultValue={updateThread?.threadContent} />
                    <br/>
                </FormControl>
                <br/>
                <Button onClick={performUpdate}>Submit</Button>
        </div>
    );

    // TODO: conditionally render a button for administrators to delete threads, threads must delete all comments before they are deleted.
    // Display the threads from the database matching this topic
    return (
        props.currentTopic?.id
        ?
        <>
            <CssBaseline/>
            <Snackbar className={classes.snackbar} open={toastOpen} autoHideDuration={6000} onClose={performClose}>
                <Alert onClose={performClose} severity="warning">
                    Are you sure you want to delete that thread? 
                    <Button className={classes.toastButton} variant="contained" color="primary" onClick={() => {performDelete(); setDone(false);} } component = {Link} to={'/forum'}>
                        Yes
                    </Button>
                </Alert>
            </Snackbar>
            <div>
                <button type="button" onClick={handleOpen}>
                    Create New Thread
                </button>
                <Modal
                    open={open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
                <Modal
                    open={open2}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body2}
                </Modal>
            </div>
            <Container className={classes.root} maxWidth='lg'>
                <Typography variant='h1'>{props.currentTopic?.subforumTitle} Forum</Typography>
                <Grid
                    direction="column"
                    spacing={10}
                >
                    {isAdmin ? threads?.map((thread) =>  {
                        return <Grid item className={classes.threadItem}>
                            <Box className={classes.threadItem} color="text.primary">
                                <ButtonBase onClick={() => {props.setCurrentThread(thread); handleClose()}} component={Link} to={"/threads/" + thread.id}>
                                    <Typography variant='h6'>{thread.threadTitle} | {thread.threadContent}</Typography>
                                </ButtonBase>
                                <Button onClick={() => {performOpen(thread);} }>
                                    <DeleteOutline />
                                </Button>
                                <Button onClick={() => {setUpdateThread(thread); performOpen2();}}>
                                    <Update />
                                </Button>
                            </Box>
                        </Grid>}): threads?.map((thread) => {
                        return <Grid item className={classes.threadItem}>
                        <ButtonBase onClick={() => {props.setCurrentThread(thread); handleClose()}} component={Link} to={"/threads/" + thread.id}>
                            <Box className={classes.threadItem} color="text.primary">
                                <Typography variant='h6'>{thread.threadTitle} | {thread.threadContent}</Typography>
                            </Box>
                        </ButtonBase>
                        </Grid>})}
                    <Grid item className={classes.button}>
                        <ButtonBase component={Link} to='/forum'>
                            <Typography variant='h6'>Back</Typography>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Container>
        </>
        :
        <Redirect to="/forum" />
    )
}

export default ForumComponent;