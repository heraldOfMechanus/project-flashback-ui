import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Typography, CssBaseline, Grid, makeStyles } from '@material-ui/core';
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

    let [threads, setThreads] = useState([] as Thread[]);
    
    function showState() {
        console.log(props.currentTopic);
    }

    const useStyles = makeStyles(() => ({
        root: {
            backgroundColor: 'lavender',
            width: '80%',
        },
        button: {
            backgroundColor: 'lightskyblue',
            width: '15rem',
        },
    }))

    const classes = useStyles();

    useEffect(() => {
        if(!threads[0]) {
            fetchThreads();
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

    //#TODO: Button/Modal that will allow the user to create new threads on this subforum!
    // Display the threads from the database matching this topic
    return (
        <>
            <CssBaseline/>
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