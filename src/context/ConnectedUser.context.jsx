import React, { createContext, useState } from 'react'

const ConnectedUserContext = createContext();

const ConnectedUserProvider = ({ children }) => {

    const [connectedUser, setConnectedUser] = useState(null);

  return (
    <ConnectedUserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {children}
    </ConnectedUserContext.Provider>
  )
}

export { ConnectedUserContext, ConnectedUserProvider };