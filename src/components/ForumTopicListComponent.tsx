import React from 'react';
import { Theme, useTheme, makeStyles, createStyles } from '@material-ui/core/styles';
import { Box, Button, Container, CssBaseline, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ButtonBase } from '@mui/material';

function ForumTopicListComponent() {
    
    const useStyles = makeStyles((theme) => ({
        flexgrow: {
            flexGrow: 1,
            width: '70%',
        },
        root: {
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
            <Container maxWidth="lg" className={classes.flexgrow}>       
                <Grid 
                    className={classes.root}
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