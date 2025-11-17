import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

    //Once I build login I can use this to prevent people from going to pages they don't belong!
    //if (!isAuthenticated) {
    //  navigate('/login', { replace: true });
    //}

const BossTable = () => {

  const [count, setCount] = useState(0) ;
  const [bosses, setBosses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      axios.get('https://localhost:7289/Boss')
        .then(function (response) {
          setBosses(response.data.data)
          console.log(response.data.data)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
          setLoading(false)
        })
    };


  //Lets start with a filled table
  fetchData();

  //Pull the data again every minute
  const Interval = setInterval(fetchData, 60000);
  //prevent memory leakage
  return () => clearInterval(Interval);

  }, []);

  const paginationModel = { page: 0, pageSize: 50 };
  
  const columns = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'level', headerName: 'Level', width: 200 },
    { field: 'maxLife', headerName: 'Health', width: 200 },
  ];
  
  const RedirectToBoss = (params) => {
    const bossName = params.row.name;
    console.log(params.row.id)
    navigate(`/bosses/detail`, { state: { id: params.row.id }});
  };

  return (
    <div data-test="bosses-table" className="bossOverview">
      <Paper sx={{ height: 400, width: '100%', backgroundColor: 'black' }}>
        <DataGrid
          rows={bosses}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[50, 100]}
          onRowClick={RedirectToBoss}
          sx={{ border: 2,
                boxShadow: 2,
                backgroundColor: 'black',
                borderColor: 'white'
           }}
        />
      </Paper>
    </div>
  )
};

export default BossTable;