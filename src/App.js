import { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Store from './store'

import { auth } from './firebaseConfig'

import Home from './pages/home/Home'
import List from './pages/list/List'
import Create from './pages/create/Create'
import Register from './pages/register/Register'


const App = () => {
  // useEffect(() => {
  //   auth.onAuthStateChanged(() => {
  //   })
  // }, [])

  return(
    <Store>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list/:id" element={<List />} />
          <Route path="/create" element={<Create />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </Store>
  )
}

export default App