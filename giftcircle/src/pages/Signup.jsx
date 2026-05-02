import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import Navbar from '../components/layout/Navbar'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB]">
      <Navbar />
      <div className="max-w-5xl mx-auto px-8 py-16 grid grid-cols-2 gap-12">
        
        {/* Left */}
        <div className="flex flex-col justify-center">
          <p className="text-4xl text-[#2C1F14] leading-snug mb-4"
             style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
            "The best gifts come from circles of love."
          </p>
          <p className="text-sm text-[#9A8878]">
            Join thousands gifting together on GiftCircle
          </p>
        </div>

        {/* Right - Form */}
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-[#DDD3C6]">
          <h2 className="text-2xl font-bold text-[#2C1F14] mb-1"
              style={{ fontFamily: 'Georgia, serif' }}>
            Create your account
          </h2>
          <p className="text-sm text-[#9A8878] mb-8">
            Already have one?{' '}
            <Link to="/login" className="text-[#7D4E2D] font-semibold">Log in</Link>
          </p>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <form onSubmit={handleSignup} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-bold tracking-widest text-[#9A8878] uppercase block mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Andile Vilakazi"
                className="w-full border border-[#DDD3C6] rounded-lg px-4 py-3 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-[#9A8878] uppercase block mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-[#DDD3C6] rounded-lg px-4 py-3 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
                required
              />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-[#9A8878] uppercase block mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-[#DDD3C6] rounded-lg px-4 py-3 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#2C1F14] text-[#F7F2EB] py-3 rounded-lg font-semibold hover:bg-[#7D4E2D] transition"
            >
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup