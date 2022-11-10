import React from 'react'
import {useMoralis} from 'react-moralis'

function Button () {

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
                boxShadow: '1px 2px 9px red',
                cursor: 'pointer',
                
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