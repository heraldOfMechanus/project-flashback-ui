import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Container, CssBaseline, Grid, Typography } from '@material-ui/core';

import {Subforum} from '../dtos/Subforum';
import {getAllSubForums} from '../remote/sub-forum-service';
import SubforumRenderComponent from './SubforumRenderComponent';

interface IForumTopicProps {
    currentTopic: Subforum | undefined
    setCurrentTopic: (nextTopic: Subforum | undefined) => void;
}

function ForumTopicListComponent(props: IForumTopicProps) {

    let [subforums, setSubforums] = useState([] as Subforum[]);

    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '70%',
            backgroundColor: 'skyblue',
            paddingBottom: '1rem',
            borderRadius: '1rem',
        },
        display: {
            backgroundColor: 'lavender',
            borderRadius: '.7rem',
            padding: '1.7rem',
            justifySelf: 'left',
        },
        button: {
            margin: '2rem',
            backgroundColor: 'lightskyblue',
            justifyContent: 'center',
            borderRadius: '.7rem',
            textAlign: 'center',
            width: '20rem',
            padding: '1rem',
        },
    }))

    const classes = useStyles();

    // Renders if the Subforums list has no entries.
    useEffect(() => {
        if(!subforums?.[0]) {
            getSubforums();
        }
    })

    async function getSubforums() {
        try {
            console.log('I am getting all subforums.');
            let Subforums = await getAllSubForums();
            setSubforums(Subforums);
        } catch (e: any) {
            console.log(e.message);
        }
    }

    return (
        <>     
            <CssBaseline />
            <Container maxWidth="lg" className={classes.root}>
                <Typography variant='h2'>Forums</Typography>
                <Grid 
                    className={classes.display}
                    direction="column"
                    justifyContent="center"
                    spacing={10}
                >
                    {subforums[0] ? <SubforumRenderComponent subforums={subforums} setSubforums={setSubforums} currentTopic={props.currentTopic} setCurrentTopic={props.setCurrentTopic} />: <></>}                    
                </Grid>
            </Container>
        </>
    )
}

export default ForumTopicListComponent;