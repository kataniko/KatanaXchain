import React from 'react'
import { useMoralis } from 'react-moralis';
import { makeStyles } from '@material-ui/core';

const Button = () => {


    const useStyles = makeStyles(() => ({
        button: {

          flex: 1,
          color: "white",
          fontfamily: 'Island Moments',
          fontSmooth: "always",
          cursor: "pointer",
          boxShadow: '1px 2px 9px red',
          backgroundColor : "transparent",
          padding : 10,
          marginLeft: 10,
          
        },
    }));

    const classes = useStyles();

    const {
        authenticate,
        isAuthenticated,
        user
    } = useMoralis()


    if (!isAuthenticated) {
        return (
            <button className={classes.button} onClick={authenticate}>Connect</button>
        )
    }

    
    return (
        <div>
            <p>{user.getUsername()}</p>
            <p>{user.get('ethAddress')}</p>
        </div>
    )



}

export default Button

