import { createContext, useContext, useState } from 'react'

// 1. Estado inicial por defecto cuando no hay nadie conectado
const INITIAL_USER = {
  Id: null,
  nombre: null,
  correo: null,
  rol: null,
  activo: null,
  color_avatar: null,
  fecha_registro: null
};

// 2. Crear el Contexto
const ConnectedUserContext = createContext();

// 3. Crear el Provider
const ConnectedUserProvider = ({ children }) => {

  const [connectedUser, setConnectedUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : INITIAL_USER;
  });

  // Función para Iniciar Sesión (guarda usuario y token)
  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setConnectedUser(userData);
  };

  // Función para Cerrar Sesión (limpia la memoria)
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setConnectedUser(INITIAL_USER);
  };

  return (

    <ConnectedUserContext.Provider value={{
      connectedUser,
      setConnectedUser,
      login,
      logout,
      isAuthenticated: Boolean(connectedUser.Id)
    }}>
      {children}
    </ConnectedUserContext.Provider>
  )
}

// 4. Hook Personalizado para facilitar el uso en toda la app
export const useConnectedUser = () => {
  const context = useContext(ConnectedUserContext);
  if (!context) {
    throw new Error('useConnectedUser debe usarse dentro de un ConnectedUserProvider');
  }
  return context;
};

export { ConnectedUserProvider };