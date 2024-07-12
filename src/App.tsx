// Routing
import { Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'

// Styles
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
