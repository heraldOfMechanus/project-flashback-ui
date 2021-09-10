import {Subforum} from '../dtos/Subforum';
import { Grid, Box, ButtonBase, Typography } from '@material-ui/core';
import {Link} from 'react-router-dom';

interface ISubforumRenderProps {
    subforums: Subforum[] | undefined
    setSubforums: (nextSubforums: Subforum[]) => void;
    currentTopic: string | undefined
    setCurrentTopic: (nextTopic: string | undefined) => void;
}

function SubforumRenderComponent(props: ISubforumRenderProps) {

    let topic = {...props.subforums};
    // topic?.array.forEach(element => {
    //     return (
    //         <>
    //             <Typography variant='h1'>{element.subforumTitle}</Typography>
    //             <Grid item>
    //                 <Box color="text.primary">
    //                 <ButtonBase onClick={() => {props.setCurrentTopic('Java')}} component={Link} to='/forum/java'>
    //                         <Typography variant='h6'>{Subforum.subforumTitle}</Typography>
    //                     </ButtonBase>
    //                 </Box>
    //             </Grid>
    //         </>
    //     )
    // });

    return (
        <>
            <Typography variant='h1'>{topic[0].subforumTitle}</Typography>
        </>
    )
}

export default SubforumRenderComponent;