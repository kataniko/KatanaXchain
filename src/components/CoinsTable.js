import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { Container, createTheme, TextField, ThemeProvider, Typography } from '@material-ui/core';

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
            <Container style={{ textAlign: "center" }}>
            <Typography variant='h6' style={{margin: 18,font: "bold",fontFamily:"Prompt"}}>
            Crypto Prices by Market Cap
            </Typography>
            <TextField label="Search for a Crypto.." variant="outlined" style={{ marginBottom: 20, width: "100%" }}/>
            </Container>
        </ThemeProvider>
  )
};

export default CoinsTable