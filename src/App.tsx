// Routing
import { Route, Routes, useLocation } from 'react-router-dom'

// React Transition Group
import { CSSTransition, TransitionGroup } from 'react-transition-group'

// Pages
import Favorites from './pages/Favorites/Favorites'
import Home from './pages/Home/Home'
import Orders from './pages/OrderForm/OrderForm'
import OrderHistory from './pages/OrderHistory/OrderHistory'
import Profile from './pages/Profile/Profile'

// Styles
import './App.css'
import FloatingBasket from './components/FloatingBasket/FloatingBasket'
import { BonusProvider } from './context/BonusContext'
import { CartProvider } from './context/CartContext'
import Inner from './pages/Inner/Inner'
import OrderForm from './pages/OrderForm/OrderForm'
import PizzaBasket from './pages/PizzaBasket/PizzaBasket'

function App() {
  const location = useLocation()

  return (
    <BonusProvider>
      <CartProvider>
        <TransitionGroup>
          {location.pathname === '/' && <FloatingBasket />}
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/orders' element={<Orders />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/inner/:id' element={<Inner />} />
              <Route path='/pizza_basket' element={<PizzaBasket />} />
              <Route path='/pizza_order' element={<OrderForm />} />
              <Route path='/order-history/:telegramId' element={<OrderHistory />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </CartProvider>
    </BonusProvider>
  )
}

export default App
