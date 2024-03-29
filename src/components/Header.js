import { AppBar, Container, Select, Toolbar, Typography, MenuItem, makeStyles, createTheme, ThemeProvider } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';
import { motion } from "framer-motion";
import Button from '../components/Button';

//estilos do MUI

const useStyles = makeStyles(() => ({

  title: {
    flex: 1,
    color: "white",
    fontfamily: 'Island Moments',
    fontWeight: "bold",
    cursor: "pointer",
    textShadow: '0px 1px 10px green',
    
  },

  select:{
    width: 100,
    height: 41,
    marginRight: 15,
    boxShadow: '1px 2px 9px green',
    fontFamily: "Prompt",
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "green",
    borderWidth: "1px",
    borderRadius: "4px", 
  },
}));


const Header = () => {

  const classes = useStyles(); //chamar os estilos que criamos
  const history = useHistory(); //hook do react-router-dom para redirecionar nas páginas
  const { currency, setCurrency } = CryptoState(); //ContextAPI

  //darktheme MUI

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  


  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar style={{  boxShadow:"10px 2px 10px green"}} color='transparent' position='static'>
        <Container >
          <Toolbar>
           
            {/* Logo */}
            <Typography onClick={() => history.push("/")}
                style={{flex: 1,textShadow: "0px 0px 15px green" ,color: "white",cursor: "pointer",fontFamily:"Island Moments"}}
                variant="h3">

                <motion.div initial={{x: -810,opacity: 0,scale: 0.5,}}
                animate={{x: 0,opacity: 1,scale: 1,}}
                transition={{duration: 1.5,}}>

                KX

              </motion.div>   
            </Typography>
            
            <motion.div 
            initial={{ x: +800, opacity: 0,scale: 0.5}}
            animate={{x: 0, opacity: 1,scale: 0.9,}}
            transition={{duration: 1.5,}}>

              {/* select para o contextAPI */}
              <Select className={classes.select} variant="outlined" 
              value={currency} onChange={(e) => setCurrency(e.target.value)}>

                {/* As duas opções de valores para a currency */}
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"EUR"}>EUR</MenuItem>

              </Select>
            </motion.div>
            
            <motion.div initial={{x: +800,opacity: 0,scale: 1}}
              animate={{x: 0,opacity: 1,scale: 0.9,}}
              transition={{duration: 1.5,}}>
             
              <Button styles={classes.title} />
              
            </motion.div>

          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  )
}

export default Header