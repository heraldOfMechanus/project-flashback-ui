import React from 'react';
import { Theme, useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Button, Container, CssBaseline, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';

interface IForumTopicProps {
    currentTopic: string | undefined
    setCurrentTopic: (nextTopic: string | undefined) => void;
}

function ForumTopicListComponent(props: IForumTopicProps) {

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
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('java')}} component={Link} to='/forum/java'>
                            <Typography variant='h6'>Core Java</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('database')}} component={Link} to='/forum/databases'>
                            <Typography variant='h6'>Databases</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('web')}} component={Link} to='/forum/webservices'>
                            <Typography variant='h6'>Web Services</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('react')}} component={Link} to='/forum/react'>
                            <Typography variant='h6'>React</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('spring')}}component={Link} to='/forum/spring'>
                            <Typography variant='h6'>Spring</Typography>
                            </ButtonBase>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <ButtonBase onClick={() => {props.setCurrentTopic('misc')}} component={Link} to='/forum/misc'>
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
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ForumTopicListComponent;