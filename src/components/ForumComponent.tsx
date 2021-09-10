import React from 'react';
import { Container, Typography, CssBaseline } from '@material-ui/core';
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

    // Display the threads from the database matching this topic
    return (
        <>
            <CssBaseline/>
            <Container>
            <Typography variant='h1'>{props.currentTopic} forums</Typography>
            <ButtonBase component={Link} to='/forum'>
                <Typography variant='h6'>Fuck go back</Typography>
            </ButtonBase>

            <ButtonBase onClick={() => {displayTopic()}}>
                <Typography variant='h6'>Display Topic</Typography>
            </ButtonBase>
            </Container>
        </>
    )
}

export default ForumComponent;