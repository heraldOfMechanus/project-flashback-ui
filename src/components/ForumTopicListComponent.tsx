import React from 'react';
import {Box, Button, Container, CssBaseline} from '@material-ui/core';
import { Grid } from '@mui/material';

import { Theme, useTheme, makeStyles, createStyles } from '@material-ui/core/styles';

import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';


function ForumTopicListComponent() {

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
                            <Button>C L I C K Y B O I</Button>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>                    
                        <Box color="text.primary" clone>
                            <ButtonBase component={Link} to='/'><Button>C L I C K Y B O I 2</Button></ButtonBase>
                        </Box>                    
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ForumTopicListComponent;