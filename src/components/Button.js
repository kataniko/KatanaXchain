import React from 'react'
import {useMoralis} from 'react-moralis'

const Button = () => {

  const{
    authenticate,
    isAuthenticated,
    user    
  }= useMoralis()

  if(!isAuthenticated){
    return(
      <div >
        <button style={{
                width: 100,
                height: 40,
                color: "white",
                backgroundColor:"transparent",
                boxShadow: '1px 2px 9px green',
                cursor: 'pointer',
                borderStyle: "solid",
                borderColor: "green",
                borderWidth: "1px",
                borderRadius: "4px",
                fontFamily: "Prompt",
                fontSize: "15px",
                
              }} onClick={authenticate}>Connect</button>
      </div>
    )
  }
  
  return(
    <div>
      <p>{user.getUsername()}</p>
      <p>{user.get('ethAdress')}</p>
    </div>
  )

}

export default Button


