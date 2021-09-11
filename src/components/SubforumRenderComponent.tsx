import {render} from '@testing-library/react';
import {Subforum} from '../dtos/Subforum';
import { Grid, Box, ButtonBase, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';

interface ISubforumRenderProps {
    subforums: Subforum[] | undefined
    setSubforums: (nextSubforums: Subforum[]) => void;
    currentTopic: string | undefined
    setCurrentTopic: (nextTopic: string | undefined) => void;
}

function SubforumRenderComponent(props: ISubforumRenderProps) {
    
    return (
        <>
            {props.subforums?.map((subforum) => {
                return <Grid item>
                <Box color="text.primary">
                    <ButtonBase onClick={() => {props.setCurrentTopic(subforum.subforumTitle)}} component={Link} to={"/forum/" + subforum.subforumTitle}>
                        <Typography variant='h6'>{subforum.subforumTitle}</Typography>
                    </ButtonBase>
                </Box>
            </Grid>
            })}
        </>
    );
}

export default SubforumRenderComponent;