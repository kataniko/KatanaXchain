import { AppBar, Container,Select,Toolbar, Typography, MenuItem, makeStyles, createTheme, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { motion } from "framer-motion";



const useStyles = makeStyles(() => ({ 
    title : {
      flex: 1,
      color: "white",
      fontFamily:"Montserrat",
      fontWeight: "Bold",
      cursor: "pointer",
    },
  }));

const  Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currency, setCurrency } = CryptoState();
  
  const darkTheme = createTheme({
    palette : {
      primary: {
        main:"#fff",
      },
      type: "dark",
    },
  });
  
  return (
    <ThemeProvider theme={darkTheme}>
     <div > 
      <AppBar color='transparent' position='static'>
       <Container>
          <Toolbar>
            <Typography onClick={() => history.push("/")} 
              className={classes.title}
              variant="h5">
              <motion.div 
              initial={{
                x: -800,
                opacity: 0,
                scale: 0.5
              }}

              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
              }}
              
              transition={{
                duration: 2 ,
              }}>
                KatanaXchain
              </motion.div>
            </Typography>

          
          <motion.div 
           initial={{
            x: +800,
            opacity: 0,
            scale: 0.5
          }}

          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          
          transition={{
            duration: 2 ,
          }}>
            
            <Select variant="outlined" 
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              >

                <MenuItem  value={"USD"}>USD</MenuItem>
                <MenuItem  value={"EUR"}>EUR</MenuItem>
          
            </Select>
          </motion.div>

          </Toolbar>
        </Container>
      </AppBar>
    </div> 
    </ThemeProvider>
  )
}


export default Header