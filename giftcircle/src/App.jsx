import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateCircle from './pages/CreateCircle'
import CircleDetail from './pages/CircleDetails'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/circle/new" element={<CreateCircle />} />
          <Route path="/circle/:id" element={<CircleDetail />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App