import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';

function AdminDashBoardComponent(props: { [x: string]: any; children: any; value: any; index: any; }) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
>
    {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
    }

    AdminDashBoardComponent.propTypes = {
        children: PropTypes.node,
        index: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
    };

    function a11yProps(index: number) {
        return {
            id: `action-tab-${index}`,
            'aria-controls': `action-tabpanel-${index}`,
        };
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            backgroundColor: theme.palette.background.paper,
            width: '100%',
            minHeight: 200,
            display: 'flex',
            justifyContent: 'center',

        },
        box: {
            width: '100%',
            paddingLeft: '3px',
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        fabGreen: {
            color: theme.palette.common.white,
            backgroundColor: green[500],
            '&:hover': {
                backgroundColor: green[600],
            },
        },
    }));

    export default function FloatingActionButtonZoom() {
        const classes = useStyles();
        const theme = useTheme();
        const [value, setValue] = React.useState(0);

        const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
            setValue(newValue);
        };

        const handleChangeIndex = (index: React.SetStateAction<number>) => {
            setValue(index);
        };

        const transitionDuration = {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen,
        };

        const fabs = [
            {
                color: 'primary',
                className: classes.fab,
                icon: <AddIcon />,
                label: 'Add',
            },
            {
                color: 'secondary',
                className: classes.fab,
                icon: <EditIcon />,
                label: 'Edit',
            },
            {
                color: 'inherit',
                className: clsx(classes.fab, classes.fabGreen),
                icon: <UpIcon />,
                label: 'Expand',
            },
        ];

        return (
            <><h1>Trivia manager</h1>
                <div className={classes.root}>
                    <div className={classes.box}>
                        <AppBar position="static" color="default">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                variant="fullWidth"
                                aria-label="action tabs example"
                            >
                                <Tab label="Add new" {...a11yProps(0)} />
                                <Tab label="Update" {...a11yProps(1)} />
                                <Tab label="Find" {...a11yProps(2)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >
                            <AdminDashBoardComponent value={value} index={0} dir={theme.direction}>
                                Add new shit
                                // TODO: Add components to perform the job in here to abstract code!


                            </AdminDashBoardComponent>
                            <AdminDashBoardComponent value={value} index={1} dir={theme.direction}>
                                Update old shit


                            </AdminDashBoardComponent>
                            <AdminDashBoardComponent value={value} index={2} dir={theme.direction}>
                                Find that shit


                            </AdminDashBoardComponent>
                        </SwipeableViews>
                        {fabs.map((fab, index) => (
                            <Zoom
                                key={fab.color}
                                in={value === index}
                                timeout={transitionDuration}
                                style={{
                                    transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                                }}
                                unmountOnExit
                            >
                                <Fab aria-label={fab.label} className={fab.className}>
                                    {fab.icon}
                                </Fab>
                            </Zoom>
                        ))}
                    </div>
                </div>
            </>
    );
}
