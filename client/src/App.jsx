import React from 'react'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/ m' element={<Home/>}/>
      </Routes>
    </Router>
  )
}

export default App