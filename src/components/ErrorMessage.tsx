import {Alert} from '@material-ui/lab';
import {Typography} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';

interface IErrorMessageProps {
    errorMessage: string;
}

function ErrorMessageComponent(props: IErrorMessageProps) {

    const useStyles = makeStyles((theme) => ({
        alert: {
            display: 'flex',
            alignSelf: 'center',
            padding: theme.spacing(0, 5),
            width: `25rem`,
            margin: 54,
        },
    }));

    const classes = useStyles();
    const theme = useTheme();

    return(
        <Alert className={classes.alert} severity="error">
            <Typography>{props.errorMessage}</Typography>
        </Alert>
    )
}

export default ErrorMessageComponent;