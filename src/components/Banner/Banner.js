import { makeStyles, Container, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';
import { motion } from "framer-motion";


const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./greenoca.jpeg)",
        boxShadow: '2px 1px 10px green',
       
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
        height: "80%",
        display: "flex",
        alignItems: "center",
    },

}));

function Banner() {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <motion.div
                    initial={{
                        z: 0,
                        opacity: 0,
                        scale: 0.8,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                        scale: 0.8,
                    }}
                    
                    transition={{
                        duration: 2,
                    }}
                    className={classes.tagline}>
                    <Typography
                        variant="h1"
                        style={{
                            
                            marginBottom: 12,
                            marginTop: 12,
                            fontFamily: "Island Moments",
                            textShadow: "1px 2px 9px green"
                        }}
                        >
                        KatanaXchain

                    </Typography>
                    <Typography
                        variant="h6"
                        style={{
                            color: "white",
                            fontFamily: "Prompt",
                            fontWeight: "bolder",
                            marginBottom: 20,
                            textShadow: "1px 2px 9px black",
                        }}
                        >
                        Everything you need in one place
                    </Typography>
                </motion.div>
                <motion.div
                    initial={{
                        z: 0,
                        opacity: 0,
                        scale: 1,
                    }}
                    animate={{
                        x: 0,
                        opacity: 1,
                        scale: 1,
                    }}
                    
                    transition={{
                        duration: 2,
                    }}><Carousel />

                </motion.div>
            </Container>
        </div>
    );
}

export default Banner;