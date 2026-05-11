import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthContext } from './context/AuthContext'
import Landing from './pages/Landing'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateCircle from './pages/CreateCircle'
import CircleDetail from './pages/CircleDetails'
import JoinCircle from './pages/JoinCircle'
import ProtectedRoute from './components/layout/ProtectedRoute'

function App() {
  return (
    <AuthContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join/:token" element={<JoinCircle />} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/circle/new" element={
            <ProtectedRoute><CreateCircle /></ProtectedRoute>
          } />
          <Route path="/circle/:id" element={
            <ProtectedRoute><CircleDetail /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthContext>
  )
}

export default App