import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import PlayerDetail from './playerDetail.jsx'
import PlayerTable from './playerTable.jsx'
import PlayerCreate from './playerCreate.jsx'
import MyNavbar from './navbar.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <MyNavbar />
          <div className="content">
            <Routes>
              <Route path="/players" element={<PlayerTable />} />
              <Route path="/players/:name" element={<PlayerDetail />} />
              <Route path="/players/registry" element={<PlayerCreate />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;