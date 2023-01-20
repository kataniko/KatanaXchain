import { makeStyles, Container, Typography,  } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';
import { motion } from "framer-motion";

//Inicio dos estilos do material UI

const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: "url(./greenoca.jpeg)",
        boxShadow: '1px 5px 10px green',
       
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
        imageRendering: "100%"
        
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

    katana:{

     marginBottom: 12,
     marginTop: 12,
     fontFamily: "Island Moments",
     textShadow: "1px 2px 9px black",
     textAlign: "center"
    },
    
    subtitle:{

        color: "white",
        fontFamily: "Prompt",
        fontWeight: "bolder",
        marginBottom: 20,
        textShadow: "1px 2px 9px black",

    },

}));


// Fim dos estilos Material Ui

function Banner() {
    const classes = useStyles();
    
    return (
        <motion.div initial={{z: 0,opacity: 0,scale: 0.8,}} animate={{ x: 0,opacity: 1,scale: 1,}} transition={{duration: 1.5,}} className={classes.banner}>
            
            <Container className={classes.bannerContent}>
                <motion.div className={classes.tagline}>
                    
                    <Typography className={classes.katana} variant="h2">
                        
                        KatanaXchain

                    </Typography>

                    <Typography className={classes.subtitle} variant="subtitle2">
                        
                        Everything you need in one place

                    </Typography>

                </motion.div>

                {/* Carrossel */}

                <motion.div>
                        <Carousel />
                </motion.div>


            </Container>
        </motion.div>
    );
}

export default Banner;