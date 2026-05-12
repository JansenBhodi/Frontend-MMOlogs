import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'
import PlayerDetail from './playerDetail.jsx'
import PlayerTable from './playerTable.jsx'
import PlayerCreate from './playerCreate.jsx'
import BossTable from './bossPages/BossTable.jsx'
import BossCreate from './bossPages/bossCreate.jsx'
import MechanicCreate from './mechanicPages/mechanicCreate.jsx'
import BossDetail from './bossPages/bossDetail.jsx'
import FileUploadPage from './logPages/FileUploadPage.jsx'
import MyNavbar from './navbar.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#AC1919',
    },
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
              <Route path="/bosses" element={<BossTable />} />
              <Route path="/bosses/create" element={<BossCreate />} />
              <Route path="/bosses/detail" element={<BossDetail />} />
              <Route path="/bosses/mechanics/create" element={<MechanicCreate />} />
              <Route path="/players/newlog" element={<FileUploadPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;