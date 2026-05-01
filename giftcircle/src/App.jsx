import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div className="text-3xl font-bold text-center mt-10">GiftCircle 🎁</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App