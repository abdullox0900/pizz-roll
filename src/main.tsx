import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { TelegramThemeProvider } from './context/TelegramThemeContext.tsx'
import "swiper/css" // Importing Swiper CSS
import 'swiper/css/pagination'
import { ScrollProvider } from './context/ScrollContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollProvider>
      <TelegramThemeProvider>
        <App />
      </TelegramThemeProvider>
    </ScrollProvider>
  </BrowserRouter>,
)
