import { makeStyles, Container, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';



const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./fototo.jfif)",
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },

    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    
    },

    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
      },
    
}));

function Banner() {
    const classes = useStyles();
  return (
    <div className={classes.banner}>
        <Container className={classes.bannerContent}>
            <div className={classes.tagline}>
                <Typography 
                       variant="h2"
                       style={{
                           fontWeight:"bold",
                           marginBottom: 15,
                           fontFamily: "Montserrat",
                       }}
                   >
                   KatanaXchain
               
                   </Typography>
                   <Typography
                       variant="subtitle2"
                       style={{
                           color: "darkgrey",
                           textTransform: "capitalize",
                           fontFamily: "Chakra Petch",
                           marginBottom: 20,
                   }}
                   >
                   Everything you need in one place
                   </Typography>
            </div>
          <Carousel />
        </Container>
    </div>
  );
}

export default Banner;