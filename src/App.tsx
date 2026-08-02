import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomerPage from './pages/CustomerPage'
import AdminPage from './pages/AdminPage'
import { UnitsProvider } from './context/UnitsContext'

export default function App() {
  return (
    <UnitsProvider>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<CustomerPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </UnitsProvider>
  )
}
