// Routing
import { Route, Routes, useLocation } from 'react-router-dom'

// React Transition Group
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// Pages
import Favorites from './pages/Favorites/Favorites'
import Home from './pages/Home/Home'
import Orders from './pages/Orders/Orders'
import Profile from './pages/Profile/Profile'

// Styles
import './App.css'
import Inner from './pages/Inner/Inner'

function App() {

  const location = useLocation()

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/inner' element={<Inner />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  )
}

export default App
