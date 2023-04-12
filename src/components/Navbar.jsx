import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { logo } from '../utils/constants'
import SearchBar from './SearchBar'

function Navbar() {
  return (
    <Stack 
        direction='row' 
        alignItems='center' p={2} 
        sx={{position: 'sticky', background: '#000', top: 0, justifyContent: 'space-between', zIndex: 100}}>

        <Link to='/' style={{display: 'flex', alignItems: 'center'}}>
            <img src={logo} alt='logo' height={25}/> 
            <span style={{color: 'white', fontFamily: 'impact', fontSize: '25px'}}>TubeYou</span>
        </Link>
        <SearchBar />
    </Stack>
  )
}

export default Navbar