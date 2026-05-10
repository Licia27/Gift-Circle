import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'

function JoinCircle() {
  const { token } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [status, setStatus] = useState('loading')
  const [circle, setCircle] = useState(null)

  useEffect(() => {
    if (!user) {
      navigate(`/login?redirect=/join/${token}`)
      return
    }

    const joinCircle = async () => {
    // Find circle by invite token
    const { data: circleData, error } = await supabase
      .from('circles')
      .select('*')
      .eq('invite_token', token)
      .single()

    if (error || !circleData) {
      setStatus('invalid')
      return
    }

    setCircle(circleData)

    // Check if already a member
    const { data: existing } = await supabase
      .from('circle_members')
      .select('*')
      .eq('circle_id', circleData.id)
      .eq('user_id', user.id)
      .single()

    if (existing) {
      // Already a member — just redirect
      navigate(`/circle/${circleData.id}`)
      return
    }

    // Add as member
    const { error: joinError } = await supabase
      .from('circle_members')
      .insert([{ circle_id: circleData.id, user_id: user.id }])

    if (joinError) {
      setStatus('error')
    } else {
      setStatus('success')
      setTimeout(() => navigate(`/circle/${circleData.id}`), 2000)
    }
    }

    joinCircle()
  }, [user, token, navigate])

  return (
    <div className="min-h-screen bg-[#F7F2EB]">
      <Navbar />
      <div className="max-w-md mx-auto px-8 py-24 text-center">

        {status === 'loading' && (
          <div>
            <p className="text-4xl mb-4">🎁</p>
            <p className="text-[#9A8878]">Joining circle...</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <p className="text-5xl mb-6">🎉</p>
            <h1 className="text-3xl font-light text-[#2C1F14] mb-3"
                style={{ fontFamily: 'Georgia, serif' }}>
              You're in!
            </h1>
            <p className="text-[#9A8878] mb-2">
              You've joined <strong className="text-[#2C1F14]">{circle?.name}</strong>
            </p>
            <p className="text-sm text-[#9A8878]">Redirecting you now...</p>
          </div>
        )}

        {status === 'invalid' && (
          <div>
            <p className="text-5xl mb-6">😕</p>
            <h1 className="text-2xl font-light text-[#2C1F14] mb-3"
                style={{ fontFamily: 'Georgia, serif' }}>
              Invalid invite link
            </h1>
            <p className="text-[#9A8878]">This link may have expired or is incorrect.</p>
          </div>
        )}

        {status === 'error' && (
          <div>
            <p className="text-5xl mb-6">⚠️</p>
            <h1 className="text-2xl font-light text-[#2C1F14] mb-3"
                style={{ fontFamily: 'Georgia, serif' }}>
              Something went wrong
            </h1>
            <p className="text-[#9A8878]">Please try the invite link again.</p>
          </div>
        )}

      </div>
    </div>
  )
}

export default JoinCircle