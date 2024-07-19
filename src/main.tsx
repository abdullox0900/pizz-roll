import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "swiper/css" // Importing Swiper CSS
import 'swiper/css/pagination'
import App from './App.tsx'
import { CartProvider } from './context/CartContext.tsx'
import { ScrollProvider } from './context/ScrollContext.tsx'
import { TelegramThemeProvider } from './context/TelegramThemeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <CartProvider>
      <ScrollProvider>
        <TelegramThemeProvider>
          <App />
        </TelegramThemeProvider>
      </ScrollProvider>
    </CartProvider>
  </BrowserRouter >
)
