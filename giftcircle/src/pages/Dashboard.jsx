import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'

function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [circles, setCircles] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchCircles()
  }, [user])

  const fetchCircles = async () => {
    const { data, error } = await supabase
      .from('circles')
      .select('*')
      .eq('created_by', user.id)
      .order('created_at', { ascending: false })

    if (!error) setCircles(data)
    setLoading(false)
  }

  const occasions = {
    Birthday: '🎂',
    'Baby Shower': '🌿',
    Graduation: '🎓',
    Wedding: '💍',
    Other: '🎁',
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB]">
      <Navbar />
      <div className="max-w-6xl mx-auto px-8 py-12">

        {/* Header */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl text-[#2C1F14]"
                style={{ fontFamily: 'Georgia, serif' }}>
              Good morning,{' '}
              <em className="text-[#7D4E2D]">
                {user?.user_metadata?.full_name?.split(' ')[0] || 'friend'}.
              </em>
            </h1>
            <p className="text-sm text-[#9A8878] mt-2">
              You have {circles.length} active circle{circles.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Link
            to="/circle/new"
            className="bg-[#2C1F14] text-[#F7F2EB] px-6 py-3 rounded-full font-semibold text-sm hover:bg-[#7D4E2D] transition"
          >
            + New circle
          </Link>
        </div>

        {/* Circles Grid */}
        {loading ? (
          <p className="text-[#9A8878]">Loading your circles...</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {circles.map((circle) => (
              <Link to={`/circle/${circle.id}`} key={circle.id}>
                <div className="bg-white rounded-2xl overflow-hidden border border-[#DDD3C6] shadow-sm hover:shadow-md hover:-translate-y-1 transition cursor-pointer">
                  <div className="h-24 bg-[#EDE5D8] flex items-center justify-center text-4xl relative">
                    {occasions[circle.occasion] || '🎁'}
                    <span className="absolute bottom-2 right-3 text-xs text-[#9A8878] uppercase tracking-widest font-bold">
                      {circle.occasion}
                    </span>
                  </div>
                  <div className="p-5">
                    <p className="font-bold text-[#2C1F14] text-base mb-1">{circle.name}</p>
                    <p className="text-xs text-[#9A8878]">For {circle.recipient}</p>
                  </div>
                </div>
              </Link>
            ))}

            {/* New Circle Card */}
            <Link to="/circle/new">
              <div className="bg-[#F0E8E0] border-2 border-dashed border-[#DDD3C6] rounded-2xl min-h-[180px] flex flex-col items-center justify-center gap-3 hover:border-[#7D4E2D] hover:text-[#7D4E2D] text-[#9A8878] transition cursor-pointer">
                <div className="w-12 h-12 rounded-full bg-white border border-[#DDD3C6] flex items-center justify-center text-2xl">
                  +
                </div>
                <p className="text-sm font-medium">Start a new circle</p>
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard