import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, TextField, ThemeProvider, Typography } from '@material-ui/core';
import { motion } from "framer-motion";

const CoinsTable = () => {
    const [CoinsTable, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const { currency } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true)
        const { data } = await axios.get(CoinList(currency));

        setCoins(data);
        setLoading(false);
    };
    
    useEffect(() => {
        fetchCoins();

    }, [currency]);

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
            <Container style={{textAlign: "center" }}>
            <motion.div initial={{
                z: -800,
                opacity: 0,
                scale: 0.5,
              }}

              animate={{
                x: 0,
                opacity: 1,
                scale: 1,
              }}

              transition={{
                duration: 2,
              }}>
            <Typography variant='h6' style={{textShadow: "1px 2px 9px black" , margin: 18,font: "bold",fontFamily:"Prompt"}}>
            Crypto Prices by Market Cap
            </Typography>
            <TextField  label="Search for a Crypto.." variant="outlined" style={{ boxShadow: "1px 2px 15px green" ,fontFamily:"Prompt", marginBottom: 20, width: "100%" }}/>
            </motion.div>
            </Container>
        </ThemeProvider>
  )
};

export default CoinsTable