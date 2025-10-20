import { Routes, Route } from 'react-router-dom'
import PlayerDetail from './playerDetail.jsx'
import PlayerTable from './playerTable.jsx'

function App() {
  return (
    <Routes>
      <Route path="/players" element={<PlayerTable />} />
      <Route path="/players/:name" element={<PlayerDetail />} />

    </Routes>
  );
}

export default App;