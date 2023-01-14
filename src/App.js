import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles(() => ({

  App: {
    backgroundColor: '#14161a',
    color: "white",
    minHeight: "100vh",
  },
  
}))


function  App() {
  const classes = useStyles();

  return (
    <BrowserRouter >
    <MoralisProvider
    serverUrl='https://gqasdf4tkkiu.usemoralis.com:2053/server'
    appId='TL0YJzCoVXgYv0fMKfzmgD52UaoaMllZI1DxTJWJ'
    >
     <div className={classes.App}>
         <Header />
       <Route path="/" component={Homepage} exact />
       <Route path="/coins/:id" component={CoinPage} />
     </div>
    </MoralisProvider>
 </BrowserRouter>
  );
}

export default App;
