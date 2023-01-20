import { makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";



//função formatar numeros

export function numberWithCommas(x){
  return x.toString().replace().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

  const  [trending, setTrending] = useState([]);
  const { currency , symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    console.log(data);
    setTrending(data);
  };

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  //estilos MUI

  const useStyles = makeStyles((theme) => ({
    
    carousel: {
      height: "80%",
      display: "flex",
      alignItems: "center",
    },
    carouselItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      cursor: "pointer",
      textTransform: "uppercase",
      color: "white",
    },
  }));
  
  
//Conteudo do carrossel

  const classes = useStyles();

  const items = trending.map((coin) => {

    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />

        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500,}} >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{fontSize: 22 , fontWeight: 500}}>
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>

      </Link>
      
    );
  });

  //Número de moedas .pixeis

  const responsive = {
    128:{
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  //chamar o carrossel

  return (
    <div className={classes.carousel}>
      <AliceCarousel

       //definições do carrossel

        f
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
        mouseTracking
      />
    </div>
  );
};

export default Carousel;
