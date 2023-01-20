import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import {
    Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
    Paper,
} from "@material-ui/core";
import axios from "axios";
import { CoinList } from "../config/api";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

//função formatar numeros

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable() {

    const [coins, setCoins] = useState([]); //receber a data da api
    const [flag, setFlag] = useState(false); // flag para verificar se chegam dados da api
    const [search, setSearch] = useState(""); //guardar a pesquisa da barra
    const [page, setPage] = useState(1); //Paginas da tabela

    const { currency, symbol } = CryptoState(); // contextAPI

 //estilos MUI

    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },

        pagination: {
            "& .MuiPaginationItem-root": {
                color: "green",
            },
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
        },

    });

    const classes = useStyles();// para aplicar os styles criados como makeStyles
    const history = useHistory(); //redirecionar para um certo componente

    //darktheme
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    //Axios para receber os dados da API e guardá-los na data e posteriormente na Coin
    const fetchCoins = async () => {

        setFlag(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
        setCoins(data);
        setFlag(false);
    };

    //trigger , dependencia currency (só dá trigger sempre que a currency for alterada)
    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);

    //função da pesquisa das moedas pelo nome ou simbolo introduzido no textfield 

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{ textAlign: "center" }}>
                <motion.div initial={{z: -800,opacity: 0, scale: 0.5,}} 
                animate={{x: 0,opacity: 1,scale: 1,}}
                transition={{duration: 1.5,}}>

                    <Typography variant='h6' style={{ textShadow: "1px 2px 9px black", margin: 18, font: "bold", fontFamily: "Prompt" }}>
                        Crypto Prices by Market Cap
                    </Typography>
                    
                    {/* //barra de pesquisa */}
                    <TextField label="Search for a Crypto.." variant="outlined" style={{ boxShadow: "1px 2px 15px green", fontFamily: "Prompt", marginBottom: 20, width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)} />


                    <TableContainer style={{ color: "white", boxShadow:"1px 2px 15px green"}} component={Paper}>

                        {/* se não chegar dados da api fica a carregar uma loading bar com o MUI */}
                        {flag ? (
                            <LinearProgress  />
                        ) : (
                           
                            //tabela das moedas

                           <Table  aria-label="simple table">
                                <TableHead style={{ textShadow: "1px 2px 9px black", margin: 18, font: "bold", fontFamily: "Prompt" , backgroundColor: "#16171a" }}>
                                    <TableRow>

                                        {/* // array para o header da tabela. Se a key head for "Coin" alinha á esquerda para dar mais espaço. */}

                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                           <TableCell
                                                style={{color: "white",fontWeight: "700",fontFamily: "Montserrat",}}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                        
                                    {/* Limite do numero de moedas por página . Page-1 = 0 , portanto a primeira página vai de 0-10 , depois as próximas adiciona-se sempre +10 */}
                                    {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                                        
                                        // verificação da variação de preço 
                                        const profit = row.price_change_percentage_24h > 0;
                                            
                                            return (
                                                //history.push = ao clicar na linha de cada moeda direciona-nos para a respetiva página.
                                                <TableRow onClick={() => history.push(`/coins/${row.id}`)} className={classes.row} key={row.name}>
                                                   
                                                   {/* primeira célula da tabela - Imagem da moeda , simbolo da moeda , nome */}
                                                    <TableCell component="th" scope="row" style={{display: "flex", gap: 15,}}>
                                                        <img
                                                            src={row?.image}
                                                            alt={row.name}
                                                            height="50"
                                                            style={{ marginBottom: 10 }}
                                                        />

                                                        <div style={{ display: "flex", flexDirection: "column" }}>

                                                            <span style={{ textTransform: "uppercase", fontSize: 22,}}>
                                                                
                                                                {row.symbol}

                                                            </span>

                                                            <span style={{ color: "darkgrey" }}>

                                                                {row.name}

                                                            </span>

                                                        </div>
                                                    </TableCell>
                                                    
                                                    {/* segunda célula da tabela - simbolo da currency(ContextAPI) e preçoda moeda */}   
                                                    <TableCell align="right">

                                                        {symbol}{" "}{numberWithCommas(row.current_price.toFixed(2))}

                                                    </TableCell>
                                
                                                    {/* terceira célula da tabela - se profit a variação fica verde e adiciona "+" , senao vermelho ;   */}
                                                    <TableCell align="right" style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500,}}>
                                                        
                                                        {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                    
                                                    </TableCell>

                                                    {/* primeira célula da tabela - simbolo do contextAPI e a capitalização de mercado (retira 6 casas e adicionamos "M") */}
                                                    <TableCell align="right">

                                                        {symbol}{" "}{numberWithCommas(row.market_cap.toString().slice(0, -6))}M

                                                    </TableCell>

                                                </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                          
                </motion.div>

                {/* paginação do MUI lab */}

                <Pagination styles={classes.pagination}
                   count={(handleSearch()?.length / 10).toFixed(0)}
                   classes={{ ul: classes.pagination }}
                   onChange={(_, value) => { setPage(value); window.scroll(0, 450);
                }}/>

            </Container>
        </ThemeProvider>
    );
}