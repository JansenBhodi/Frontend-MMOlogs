import { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Paper from '@mui/material/Paper'
import App from './App.jsx'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const PlayerTable = () => {

  const [count, setCount] = useState(0) 
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  const roleclassMap = {
    0: 'Warrior',
    1: 'Knight',
    2: 'Fighter',
    3: 'Archer',
    4: 'Fire Mage',
    5: 'Scholar',
    6: 'Cleric'

  }

  useEffect(() => {
    const fetchData = () => {
      setLoading(true)
      axios.get('https://localhost:7289/Player')
        .then(function (response) {
          setPlayers(response.data.data)
          console.log(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
          setLoading(false)
        })
    }


  //Lets start with a filled table
  fetchData()

  //Pull the data again every minute
  const Interval = setInterval(fetchData, 60000)
  //prevent memory leakage
  return () => clearInterval(Interval)

  }, [])

  const paginationModel = { page: 0, pageSize: 5 };
  
  const columns = [
    { field: 'name', headerName: 'Character Name', width: 130 },
    { field: 'roleclass', headerName: 'Class', width: 130,
      valueGetter: (value) =>
      {
        return roleclassMap[value]
      }
     },
  ]
  
  const RedirectToPlayer = (params) => {
    const playerName = params.row.name
    navigate(`/players/${playerName}`)
  }

  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      {console.log('Players:', players)}
      <DataGrid
        rows={players}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        onRowClick={RedirectToPlayer}
        sx={{ border: 0 }}
      />
    </Paper>
  )
}

export default PlayerTable