import { useEffect, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { Context } from './Store'

import { auth } from './firebaseConfig'

import Home from './pages/home/Home'
import List from './pages/list/List'
import Create from './pages/create/Create'
import Register from './pages/register/Register'


const App = () => {
  const [state, setState] = useContext(Context)
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setState({ ...state, uid: user ? user.uid : undefined })
    })
  }, [])

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list/:id" element={<List />} />
        <Route path="/create" element={<Create />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App