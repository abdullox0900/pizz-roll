import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { TelegramThemeProvider } from './context/TelegramThemeContext.tsx'
import "swiper/css" // Importing Swiper CSS
import 'swiper/css/pagination'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <TelegramThemeProvider>
      <App />
    </TelegramThemeProvider>
  </BrowserRouter>,
)
