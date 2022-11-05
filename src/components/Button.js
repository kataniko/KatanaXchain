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
      <div>
        <button onClick={authenticate}>Connect</button>
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