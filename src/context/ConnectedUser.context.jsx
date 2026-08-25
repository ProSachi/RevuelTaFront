import React, { createContext, useState } from 'react'

const ConnectedUserContext = createContext();

const ConnectedUserProvider = ({ children }) => {

    const [connectedUser, setConnectedUser] = useState({
          Id : null,
          Nombre : null,
          Correo : null,
          Rol : null,
          Activo : null,
          ColorAvatar : null,
          getFechaRegistro : null
        });

  return (
    <ConnectedUserContext.Provider value={{ connectedUser, setConnectedUser }}>
      {children}
    </ConnectedUserContext.Provider>
  )
}

export { ConnectedUserContext, ConnectedUserProvider };