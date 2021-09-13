import {render} from '@testing-library/react';
import {Subforum} from '../dtos/Subforum';
import { Grid, Box, ButtonBase, Typography, useTheme, makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';

interface ISubforumRenderProps {
    subforums: Subforum[] | undefined
    setSubforums: (nextSubforums: Subforum[]) => void;
    currentTopic: Subforum | undefined
    setCurrentTopic: (nextTopic: Subforum | undefined) => void;
}

function SubforumRenderComponent(props: ISubforumRenderProps) {
    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
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
            {props.subforums?.map((subforum) => {
                return <Grid item>
                <Box className={classes.button} color="text.primary">
                    <ButtonBase onClick={() => {props.setCurrentTopic(subforum)}} component={Link} to={"/forum/" + subforum.subforumTitle}>
                        <Typography variant='h6'>{subforum.subforumTitle}</Typography>
                    </ButtonBase>
                </Box>
            </Grid>
            })}
        </>
    );
}

export default SubforumRenderComponent;