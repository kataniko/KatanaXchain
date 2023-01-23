//imports
import axios from "axios";
import { useEffect, useState } from "react";
import { HistoricalChart } from "../config/api";
import { Line } from "react-chartjs-2";
import { CircularProgress, createTheme, makeStyles, ThemeProvider, } from "@material-ui/core";
import SelectButton from "./SelectButton";
import { CryptoState } from "../CryptoContext";
import { motion } from "framer-motion";


const CoinInfo = ({ coin }) => {

  const [historicData, setHistoricData] = useState(); //onde vão ser guardados os valores do prices.
  const [days, setDays] = useState(1); // dias para o gráfico , default 1
  const { currency } = CryptoState(); // contextAPI
  const [flag, setflag] = useState(false); //verificar a chegada dos dados

  //valores a atribuir a cada um dos botões do gráfico

  const chartDays = [
    {
      label: "1 day",
      value: 1,
    },

    {
      label: "1 week",
      value: 7,
    },

    {
      label: "1 month",
      value: 30,
    },

    {
      label: "1 Year",
      value: 365,
    },
  ];

//estilos MUI

  const useStyles = makeStyles((theme) => ({
    container: {
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,

      

      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },

    },
  }));

  const classes = useStyles();

  //receber dados da api

  const fetchHistoricData = async () => {

    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);

  };


  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  //tema do MUI

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
      <motion.div initial={{ z: -200, opacity: 0, scale: 1 }}
        animate={{ x: 0, opacity: 1, scale: 0.9, }}
        transition={{ duration: 1.5, }}
        className={classes.container}>

        {!historicData | flag === false ? (

          // circulo de carregamento se não chegar data da api com verificação do boolean da bandeira - material Ui 

          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
          //
        ) : (
          //Gráfico 
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {

                  let date = new Date(coin[0]);

                  //varificação do para o botão 1 day . se for so um dia, retorna horas e minutos, senao retorna data 
                  let time = date.getHours() > 0
                    ? `${date.getHours()}:${date.getMinutes()}`
                    : `${date.getHours()}:${date.getMinutes()}`;
                  return days === 1 ? time : date.toLocaleDateString();

                }),
                
                //label do gráfico quando sobreposto com o rato (hover)
                
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "green",
                  },
                ],
              }}

              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            <motion.div initial={{ z: -200, opacity: 0, scale: 1 }}
              animate={{ x: 0, opacity: 1, scale: 1, }}
              transition={{ duration: 2, }}

              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}>
              
              {/* //Botões de atribuição de tempo ao gráfico , que recebem os valores do chartDays. */}

              {chartDays.map((day) => (

                <SelectButton key={day.value} onClick={() => {
                  setDays(day.value);
                  setflag(false); }} selected={day.value === days}>
                  {day.label}
                </SelectButton>
              ))}

            </motion.div>

          </>
        )}
      </motion.div>
    </ThemeProvider>
  );
};

export default CoinInfo;