import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home'
import List from './pages/list/List'
import Create from './pages/create/Create'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/:id" element={<List />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  )
}

export default App