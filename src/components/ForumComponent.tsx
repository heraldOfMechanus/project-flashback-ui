import React from 'react';
import { Container, Typography, CssBaseline, Grid, makeStyles } from '@material-ui/core';
import { ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';

interface IForumProps {
    currentTopic: string | undefined
    setCurrentTopic: (nextTopic: string) => void;
}

function ForumComponent(props: IForumProps) {

    // Get the threads from the database matching this topic
    
    function displayTopic() {
        console.log(props.currentTopic);
    }

    const useStyles = makeStyles(() => ({
        root: {
            backgroundColor: 'lavender',
        },
    }))

    const classes = useStyles();

    // Display the threads from the database matching this topic
    return (
        <>
            <CssBaseline/>
            <Container className={classes.root}>
                <Typography variant='h1'>{props.currentTopic} forums</Typography>
                <Grid
                    direction="column"
                    spacing={10}
                >
                    <Grid item>
                        <ButtonBase component={Link} to='/forum'>
                            <Typography variant='h6'>Fuck go back</Typography>
                        </ButtonBase>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ForumComponent;