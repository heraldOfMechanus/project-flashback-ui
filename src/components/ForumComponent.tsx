import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Modal, useTheme, Typography, CssBaseline, Grid, makeStyles, FormControl, InputLabel } from '@material-ui/core';
import { ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';
import { Subforum } from '../dtos/Subforum';
import { addNewThread, getAllThreads } from '../remote/thread-service';
import { Thread } from '../dtos/Thread';
import { Principal } from '../dtos/Principal';

interface IForumProps {
    currentTopic: Subforum | undefined
    setCurrentTopic: (nextTopic: Subforum | undefined) => void;
    currentUser: Principal | undefined
    setCurrentUser: (nextUser: Principal | undefined) => void;
}

function ForumComponent(props: IForumProps) {

    const [threads, setThreads] = useState([] as Thread[]);
    const [open, setOpen] = useState(false);
    const [done, setDone] = useState(false);

    const [formData, setFormData] = useState({
        userId: '',
        subforumId: '',
        threadTitle: '',
        threadContent: '',
    })
    
    function showState() {
        console.log(props.currentTopic);
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

    function newThread() {
        if(formData.threadContent || formData.threadTitle || props.currentTopic?.id) {
            if(props.currentUser?.id) {
                setFormData({...formData, userId: props.currentUser.id});
            } else {
                setFormData({...formData, userId: 'Anonymous'});
            }
            if(props.currentTopic?.id) {
                setFormData({...formData, subforumId: props.currentTopic.id})
            } else {
                console.log("There was no valid subforum!");
                return;
            }

            let newThread = new Thread(formData.userId, formData.subforumId, formData.threadTitle, formData.threadContent)
            addNewThread(newThread);
        }
    }

    // Greatly reduces the amount of space spent changing pieces of state by changing one state json.
    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value });
    }

    // Get the threads from the database matching this topic
    async function fetchThreads() {
        if(props.currentTopic?.id) {
            let resp = await getAllThreads({subforumId: props.currentTopic.id});
            setThreads(resp);
            console.log(threads);
        } else {
            console.log("The subforum ID is null!");
        }
    }

    // Body of the Modal
    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h1>New Thread!</h1>
                <FormControl>
                    <InputLabel htmlFor="id-input">Subject</InputLabel>
                    <input id="title-input" type="text" onChange={handleChange} />
                    <br/>
                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="question-input">Content</InputLabel>
                    <input id="content-input" type="text" onChange={handleChange} />
                    <br/>
                </FormControl>
                <br/>
                <button id="newCard-btn" onClick={newThread}>Submit</button>
        </div>
    );

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //#TODO: Button/Modal that will allow the user to create new threads on this subforum!
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
                    onClick={handleClose}
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
                    <Grid item className={classes.button}>
                        <ButtonBase component={Link} to='/forum'>
                            <Typography variant='h6'>Fuck go back</Typography>
                        </ButtonBase>
                    </Grid>
                    <Grid item className={classes.button}>
                        <ButtonBase onClick={() => {showState()}}>
                            <Typography variant='h6'>Show State</Typography>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ForumComponent;