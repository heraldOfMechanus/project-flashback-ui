import {Alert} from '@material-ui/lab';
import {Typography} from '@material-ui/core';
import {makeStyles, useTheme} from '@material-ui/core/styles';

interface IErrorMessageProps {
    errorMessage: string;
}

function ErrorMessageComponent(props: IErrorMessageProps) {

    const useStyles = makeStyles((theme) => ({
        alert: {
            width: `25rem`,
        },
        box: {
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
        },
    }));

    const classes = useStyles();
    const theme = useTheme();

    return(
        <div className={classes.box}>
            <Alert className={classes.alert} severity="error">
                <Typography>{props.errorMessage}</Typography>
            </Alert>
        </div>
    )
}

export default ErrorMessageComponent;