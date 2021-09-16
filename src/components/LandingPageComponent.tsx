import React from 'react';
import Button from '@material-ui/core/Button';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


function LandingPageComponent() {

    const image1 = [
        {
          url: '/static/images/image-list/breakfast.jpg',
          title: 'Forum Page',
          width: '100%',
        }
        // {
        //   url: '/static/images/image-list/camera.jpg',
        //   title: 'Camera',
        //   width: '30%',
        // },
      ];
      const image2 = [
        {
          url: '/static/images/image-list/burgers.jpg',
          title: 'Trivia Page',
          width: '100%',
        }
        // {
        //   url: '/static/images/image-list/camera.jpg',
        //   title: 'Camera',
        //   width: '30%',
        // },
      ];

    const useStyles = makeStyles((theme) => ({
        root: {
            background: 'linear-gradient(45deg, #3F51B5 30%, #70a5ff 90%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: '',
            padding: '',
            textAlign: 'center',
          },
        
        image: {
            position: 'relative',
            height: 200,
            [theme.breakpoints.down('xs')]: {
              width: '100% !important', // Overrides inline-style
              height: 100,
            },
            '&:hover, &$focusVisible': {
              zIndex: 1,
              '& $imageBackdrop': {
                opacity: 0.15,
              },
              '& $imageMarked': {
                opacity: 0,
              },
              '& $imageTitle': {
                border: '4px solid currentColor',
              },
            },
          },
        focusVisible: {},
        imageButton: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.common.white,
        },
        imageSrc: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
        },
        imageBackdrop: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.palette.common.black,
            opacity: 0.4,
            transition: theme.transitions.create('opacity'),
        },
        imageTitle: {
            position: 'relative',
            padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        },
        imageMarked: {
            height: 3,
            width: 18,
            backgroundColor: theme.palette.common.white,
            position: 'absolute',
            bottom: -2,
            left: 'calc(50% - 9px)',
            transition: theme.transitions.create('opacity'),
        },
    }));
    const classes = useStyles();


    return(
        <>
            <div className={classes.root}>
                <h1>Flashback</h1>
            </div>

            <div className={classes.root}>
                {image1.map((image) => (
                    <ButtonBase
                    focusRipple
                    component={Link} to='/forum'
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            {image.title}
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                ))}
                {image2.map((image) => (
                    <ButtonBase
                    focusRipple
                    component={Link} to='/trivia'
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                    >
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            {image.title}
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                ))}
                </div>

        </>
    );
}

export default LandingPageComponent;