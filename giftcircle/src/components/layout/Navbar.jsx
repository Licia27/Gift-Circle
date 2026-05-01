import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabaseClient'

function Navbar() {
  const { user } = useAuth()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-[#2C1F14]">
        GiftCircle
      </Link>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <Link to="/dashboard" className="text-sm text-[#7D4E2D] font-medium">
              My Circles
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm bg-[#2C1F14] text-white px-4 py-2 rounded-full"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-sm text-[#2C1F14]">Log in</Link>
            <Link to="/signup" className="text-sm bg-[#2C1F14] text-white px-4 py-2 rounded-full">
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar