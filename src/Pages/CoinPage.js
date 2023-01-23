import { LinearProgress, makeStyles, Typography } from "@material-ui/core"; //componentes da página e estilos
import axios from "axios"; //consumir api 
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser"; //limpar parted de html que vem com a api desformatadas
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api"; 
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { motion } from "framer-motion";

const CoinPage = () => {
  
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [flag, setFlag] = useState(false);
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
    setFlag(true)
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


 //estilos MUI
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",

      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },

    sidebar: {
      width: "30%",

      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      borderRight: "2px solid gray",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
    },

    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },

    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },

    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",

      //estilos para tamanho médio do ecrã
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      //estilos para tamanho pequeno do ecrã
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
       //estilos para o tamanho mais reduzido do ecrã
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },

  }));

  const classes = useStyles(); //chamar os estilos criados

 //verificação de chegada de informação , caso contrário aparece uma loading bar do MUI
  if (flag === false) return <LinearProgress style={{ backgroundColor: "green" }} />; //

  return (

    //informações da moeda
    <div className={classes.container}>
      
      <motion.div className={classes.sidebar}
       initial={{x: -810,opacity: 0,scale: 0.5,}}
       animate={{x: 0,opacity: 1,scale: 1,}}
       transition={{duration: 1.5,}}>

        {/* //imagem da moeda */}
        <img 
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        {/* //nome da moeda */}
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        
        {/* //Descrição da moeda com parser para remover pedaços de html que vinham junto */}
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>

        <div className={classes.marketData}>

          <span style={{ display: "flex" }}>
            
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            
            &nbsp; &nbsp;
            
            {/* //rank formatado com a função */}
            <Typography variant="h5" style={{fontFamily: "Montserrat",}}>

              {coin?.market_cap_rank}

            </Typography>
          </span>

          <span style={{ display: "flex" }}>

            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>

            &nbsp; &nbsp;

            <Typography variant="h5" style={{fontFamily: "Montserrat"}}>

              {symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}

            </Typography>
          </span>

          <span style={{ display: "flex" }}>

            <Typography variant="h5" className={classes.heading}>

              Market Cap:

            </Typography>

            &nbsp; &nbsp;

            <Typography variant="h5" style={{fontFamily: "Montserrat"}}>

              {symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6))}M

            </Typography>
          </span>
        </div>
      </motion.div>
      
      {/* gráfico */}
      
      <CoinInfo coin={coin} />
    
    </div>
  );
};

export default CoinPage;