import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { ConnectedUserContext } from './contexts/ConnectedUser.context'
import ProfileImage from './components/profiles/ProfileImage'
import profile from './assets/profile.jpeg'
import Verified from './components/profiles/Verified'
import ButtonProfileNavigation from './components/profiles/ButtonProfileNavigation'
import { BsBagCheckFill } from 'react-icons/bs';
import { HiArrowsRightLeft } from 'react-icons/hi2';
import { FaExclamationTriangle, FaStar } from 'react-icons/fa';
import { HiPencil } from 'react-icons/hi2';
import CardProfileStadistics from './components/profiles/CardProfileStadistics'
import CardGarments from './components/profiles/CardGarments'
import Profile from './pages/community/Profile'

function App() {
  const [count, setCount] = useState(0)
  const { connectedUser, setConnectedUser } = useContext(ConnectedUserContext);

  return (
    <>
      <h1>{connectedUser}</h1>
      <ProfileImage image={profile} userName='juan' />
      <div>
        <Verified isVerified={true} />
      </div>
      <div>
        <ButtonProfileNavigation name='Editar perfil' direction='/perfil/editar' icons={HiPencil} />
      </div>
      <div>
        <CardProfileStadistics icons={BsBagCheckFill} nameStatistic='Ventas' valueStatistic={10} />
        <CardProfileStadistics icons={HiArrowsRightLeft} nameStatistic='Intercambios' valueStatistic={5} />
        <CardProfileStadistics icons={FaExclamationTriangle} nameStatistic='Reclamos' valueStatistic={2} />
        <CardProfileStadistics icons={FaStar} nameStatistic='Calificación' valueStatistic={4.5} />
      </div>
      <div>
        <CardGarments image={profile} title='Camisa de algodón' price='$50.000' size='M' id='1' />
        <CardGarments image={profile} title='Pantalón de mezclilla' price='$80.000' size='L' id='2' />
        <CardGarments image={profile} title='Chaqueta de cuero' price='$120.000' size='XL' id='3' />
      </div>

      <div>
        <Profile />
      </div>
    </>
  )
}

export default App
