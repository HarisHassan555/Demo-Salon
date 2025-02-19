import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Work from './sections/Work'
import Services from './sections/Services'
import BookingCTA from './sections/BookingCTA'
import BookingPage from './pages/BookingPage'
import Footer from './components/Footer'

const HomePage = () => (
  <main>
    <Hero />
    <About />
    <Work />
    <Services />
    <BookingCTA />
    <Footer />
  </main>
)

const AnimatedRoutes = () => {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
      </Routes>
    </AnimatePresence>
  )
}

const AppContent = () => {
  const location = useLocation()
  const isBookingPage = location.pathname === '/booking'

  return (
    <div className="min-h-screen bg-neutral-50">
      {!isBookingPage && <Navbar />}
      <AnimatedRoutes />
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}