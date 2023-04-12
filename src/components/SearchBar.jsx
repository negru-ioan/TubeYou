import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, IconButton } from '@mui/material'
import { Height, Search } from '@mui/icons-material'

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
      navigate(`/search/${searchTerm}`)
      
      setSearchTerm('')
    }
  }

  return (
    <Paper 
    component="form"
    onSubmit={handleSubmit}
    className='formus'
    sx={{
        borderRadius: 20,
        pl: 2, boxShadow: 'none', 
        mr: {sm : 5},
        border: '1px solid #e3e3e3',
        background: '#000',
        height: '40px'
    }}>
      <input 
        className='search-bar'
        placeholder='Search...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />  
      <IconButton type='submit' sx={{p: '8px', color: 'red'}}>
        <Search />
      </IconButton>
    </Paper>
  )
}

export default SearchBar