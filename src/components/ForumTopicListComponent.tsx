import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import { Box, Button, Container } from '@material-ui/core';
import { Grid } from '@mui/material';

function ForumTopicListComponent() {
    
    const useStyles = makeStyles((theme) => ({
        flexgrow: {
            flexGrow: 1,
            width: '70%',
        },
        root: {
            backgroundColor: 'lavender',
            borderRadius: '.7rem',
        },
        button: {
            margin: '2rem',
            backgroundColor: 'lightskyblue',
            justifyContent: 'center',
            textAlign: 'center',
        },
    }))

    const classes = useStyles();

    return (
        <>     
            <Container className={classes.flexgrow}>       
                <Grid 
                    container
                    className={classes.root}
                    direction="column"
                    justifyContent="center"
                    spacing={4}
                >
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <Button>C L I C K Y B O I</Button>
                        </Box>
                    </Grid>
                    <Grid item className={classes.button}>
                        <Box color="text.primary" clone>
                            <Button>C L I C K Y B O I 2</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default ForumTopicListComponent;