import React, { useEffect } from 'react';
import { useState } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { Box, Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import {DataGrid} from '@material-ui/data-grid'
import {Subforum} from '../dtos/Subforum';
import {getAllSubForums} from '../remote/sub-forum-service';
import SubforumRenderComponent from './SubforumRenderComponent';

interface IForumTopicProps {
    currentTopic: string | undefined
    setCurrentTopic: (nextTopic: string | undefined) => void;
}

function ForumTopicListComponent(props: IForumTopicProps) {

    let [subforums, setSubforums] = useState([] as Subforum[]);

    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '70%',
        },
        display: {
            backgroundColor: 'lavender',
            borderRadius: '.7rem',
            padding: '1.7rem',
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

    let done: boolean = false;
    useEffect(() => {
        
    })

    async function getSubforums() {
        try {
            console.log('I am getting all subforums.');
            let Subforums = await getAllSubForums();
            setSubforums(Subforums);
            console.log(Subforums);
        } catch (e: any) {
            console.log(e.message);
        }
    }

    return (
        <>     
            <CssBaseline />
            <Container maxWidth="lg" className={classes.root}>       
                <Grid 
                    className={classes.display}
                    direction="column"
                    justifyContent="center"
                    spacing={10}
                >
                    <SubforumRenderComponent subforums={subforums} setSubforums={setSubforums} currentTopic={props.currentTopic} setCurrentTopic={props.setCurrentTopic} />
                    <Grid item className={classes.button}>
                        <Box color="text.primary">
                            <ButtonBase onClick={() => {getSubforums();}}>
                                <Typography variant='h6'>Fetch subforums</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>

                    {/* <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('Java')}} component={Link} to='/forum/java'>
                            <Typography variant='h6'>Core Java</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('Databases')}} component={Link} to='/forum/databases'>
                            <Typography variant='h6'>Databases</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('Web Services')}} component={Link} to='/forum/webservices'>
                            <Typography variant='h6'>Web Services</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('React')}} component={Link} to='/forum/react'>
                            <Typography variant='h6'>React</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('Spring')}}component={Link} to='/forum/spring'>
                            <Typography variant='h6'>Spring</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('Misc')}} component={Link} to='/forum/misc'>
                               <Typography variant='h6'>Miscellaneous</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>                    
                    <Grid item className={classes.button}>                    
                        <Box color="text.primary" clone>
                            <ButtonBase component={Link} to='/'>
                            <Typography variant='h6'>Return to Dashboard</Typography>
                            </ButtonBase>
                        </Box>                    
                    </Grid> */}
                </Grid>
            </Container>
        </>
    )
}

export default ForumTopicListComponent;