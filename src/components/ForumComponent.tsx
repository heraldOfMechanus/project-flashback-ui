import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Modal, useTheme, Typography, CssBaseline, Grid, makeStyles } from '@material-ui/core';
import { ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';
import { Subforum } from '../dtos/Subforum';
import { getAllThreads } from '../remote/thread-service';
import { Thread } from '../dtos/Thread';

interface IForumProps {
    currentTopic: Subforum | undefined
    setCurrentTopic: (nextTopic: Subforum | undefined) => void;
}

function ForumComponent(props: IForumProps) {

    const [threads, setThreads] = useState([] as Thread[]);
    const [open, setOpen] = useState(false);
    const [done, setDone] = useState(false);
    
    function showState() {
        console.log(props.currentTopic);
    }

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

    const body = (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
    );

    useEffect(() => {
        if(!done) {
            fetchThreads();
            setDone(true);
        }
    })

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