import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Modal, useTheme, Typography, CssBaseline, Grid, makeStyles, FormControl, InputLabel, Box, Button } from '@material-ui/core';
import { ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';
import { Subforum } from '../dtos/Subforum';
import { addNewThread, getAllThreads } from '../remote/thread-service';
import { Thread } from '../dtos/Thread';
import { Principal } from '../dtos/Principal';
import { ThreadDTO } from '../dtos/ThreadDTO';


interface IForumProps {
    currentTopic: Subforum | undefined
    setCurrentTopic: (nextTopic: Subforum | undefined) => void;
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
    currentThread: Thread | undefined
    setCurrentThread: (nextThread: Thread | undefined) => void;
}

function ForumComponent(props: IForumProps) {

    let [threads, setThreads] = useState([] as Thread[]);
    let [open, setOpen] = useState(false);
    let [done, setDone] = useState(false);

    
    const [formData, setFormData] = useState({
        userId: props.currentUser?.id,
        // @ts-ignore
        subforumId: props.currentTopic.id,
        threadTitle: '',
        threadContent: '',
    })
    
    function showState() {
        console.log(threads[0]?.subforumId);
    }

    // Centers the modal on the display
    function getModalStyle() {
        return {
          top: '30%',
          left: '34%',
        };
    }
    
    const modalStyle = getModalStyle();
    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: 'lavender',
            width: '80%',
        },
        button: {
            backgroundColor: 'lightskyblue',
            width: '15rem',
        },
        paper: {
            position: 'absolute',
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
            backgroundColor: 'lightgray',
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
        }
    }))

    const classes = useStyles();

    // Automatically fetch all threads for user
    useEffect(() => {
        if(!done) {
            fetchThreads();
            setDone(true);
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

    function newThread() {
        if(formData.threadContent || formData.threadTitle || props.currentTopic?.id) {
            if(!props.currentUser?.id) {
                setFormData({...formData, ["userId"]: 'Anonymous'});
            }
            if(!props.currentTopic?.id) {
                console.log("There was no valid subforum!");
                return;
            }

            let newThread = new ThreadDTO(formData.userId, formData.subforumId, formData.threadTitle, formData.threadContent)
            addNewThread(newThread);
            handleClose()
        }
    }

    // Body of the Modal
    const body = (
        <div style={modalStyle} className={classes.paper}>
            <Box className={classes.modalButton}>
                <Button onClick={handleClose}>
                    Exit
                </Button>
            </Box>
          <h1>New Thread!</h1>
                <FormControl>
                    <InputLabel htmlFor="title-input">Subject</InputLabel>
                    <input id="title-input" type="text" onChange={handleChange} />
                    <br/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="content-input">Content</InputLabel>
                    <input id="content-input" type="text" onChange={handleChange2} />
                    <br/>
                </FormControl>
                <br/>
                <button id="newCard-btn" onClick={newThread}>Submit</button>
        </div>
    );

    // TODO: conditionally render a button for administrators to delete threads, threads must delete all comments before they are deleted.
    // Display the threads from the database matching this topic
    return (
        <>
            <CssBaseline/>
            <div>
                <button type="button" onClick={handleOpen}>
                    Open Modal
                </button>
                <Modal
                    open={open}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {body}
                </Modal>
            </div>
            <Container className={classes.root} maxWidth='lg'>
                <Typography variant='h1'>{props.currentTopic?.subforumTitle} Forum</Typography>
                <Grid
                    direction="column"
                    spacing={10}
                >
                    {threads?.map((thread) => {
                        return <Grid item className={classes.threadItem}>
                            <ButtonBase onClick={() => {props.setCurrentThread(thread); handleClose()}} component={Link} to={"/threads/" + thread.id}>
                                <Box className={classes.threadItem} color="text.primary">
                                    <Typography variant='h6'>{thread.threadTitle} | {thread.threadContent}</Typography>
                                </Box>
                            </ButtonBase>
                        </Grid>
                    })}
                    <Grid item className={classes.button}>
                        <ButtonBase component={Link} to='/forum'>
                            <Typography variant='h6'>Fuck go back</Typography>
                        </ButtonBase>
                    </Grid>
                    <Grid item className={classes.button}>
                        <ButtonBase onClick={() => {showState()}}>
                            <Typography className={classes.text} variant='h6'>Show State</Typography>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ForumComponent;