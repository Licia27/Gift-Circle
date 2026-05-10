import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'

function CircleDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [circle, setCircle] = useState(null)
  const [gifts, setGifts] = useState([])
  const [loading, setLoading] = useState(true)
  const [newGift, setNewGift] = useState({ name: '', price: '' })
  const [adding, setAdding] = useState(false)
  const [copied, setCopied] = useState(false)

  const fetchCircle = async () => {
    const { data, error } = await supabase
      .from('circles')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      console.error('Error fetching circle:', error)
      setLoading(false)
      return
    }
    setCircle(data)
  }

  const fetchGifts = async () => {
    const { data } = await supabase
      .from('gifts')
      .select('*, contributions(*)')
      .eq('circle_id', id)
    setGifts(data || [])
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchCircle()
      await fetchGifts()
      setLoading(false)
    }
    loadData()
  }, [id, user])

  const handleAddGift = async (e) => {
    e.preventDefault()
    setAdding(true)
    await supabase.from('gifts').insert([{
      circle_id: id,
      name: newGift.name,
      price: parseFloat(newGift.price) || 0,
      added_by: user.id
    }])
    setNewGift({ name: '', price: '' })
    setAdding(false)
    fetchGifts()
  }

  const handleContribute = async (giftId) => {
    await supabase.from('contributions').insert([{
      gift_id: giftId,
      user_id: user.id,
      amount: 0
    }])
    fetchGifts()
  }

  const getTotalContributions = (contributions) => {
    return contributions?.length || 0
  }

  const copyInviteLink = () => {
    const link = `${window.location.origin}/join/${circle.invite_token}`
    navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return (
    <div className="min-h-screen bg-[#F7F2EB]">
      <Navbar />
      <p className="text-center mt-20 text-[#9A8878]">Loading circle...</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F7F2EB]">
      <Navbar />

      {/* Hero */}
      <div className="bg-[#2C1F14] text-[#F7F2EB] px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <Link to="/dashboard" className="text-sm text-[#9A8878] hover:text-[#C9A97A] mb-4 block">
            ← My Circles
          </Link>
          <h1 className="text-4xl font-light mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {circle?.name}
          </h1>
          <p className="text-[#C9A97A] text-sm mb-6">
            For {circle?.recipient} · {circle?.event_date}
          </p>
          <div className="flex gap-10">
            <div>
              <p className="text-2xl font-bold">{gifts.length}</p>
              <p className="text-xs text-[#9A8878] uppercase tracking-widest">Gifts</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                R{gifts.reduce((sum, g) => sum + (g.price || 0), 0).toLocaleString()}
              </p>
              <p className="text-xs text-[#9A8878] uppercase tracking-widest">Total Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-8 py-10 grid grid-cols-3 gap-8">

        {/* Wishlist */}
        <div className="col-span-2">
          <h2 className="text-xl font-bold text-[#2C1F14] mb-6"
              style={{ fontFamily: 'Georgia, serif' }}>
            Wishlist
          </h2>

          <form onSubmit={handleAddGift} className="bg-white rounded-xl p-4 border border-[#DDD3C6] mb-6 flex gap-3">
            <input
              type="text"
              placeholder="Gift name"
              value={newGift.name}
              onChange={(e) => setNewGift({ ...newGift, name: e.target.value })}
              className="flex-1 border border-[#DDD3C6] rounded-lg px-3 py-2 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
              required
            />
            <input
              type="number"
              placeholder="Price (R)"
              value={newGift.price}
              onChange={(e) => setNewGift({ ...newGift, price: e.target.value })}
              className="w-32 border border-[#DDD3C6] rounded-lg px-3 py-2 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
            />
            <button
              type="submit"
              disabled={adding}
              className="bg-[#2C1F14] text-[#F7F2EB] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#7D4E2D] transition"
            >
              + Add
            </button>
          </form>

          {gifts.length === 0 ? (
            <p className="text-[#9A8878] text-sm">No gifts yet — add the first one above!</p>
          ) : (
            gifts.map((gift) => (
              <div key={gift.id} className="bg-white rounded-xl p-4 border border-[#DDD3C6] mb-3 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#EDE5D8] flex items-center justify-center text-2xl flex-shrink-0">
                  🎁
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-[#2C1F14] text-sm">{gift.name}</p>
                  <p className="text-xs text-[#9A8878]">
                    R{gift.price?.toLocaleString()} · {getTotalContributions(gift.contributions)} contributor{getTotalContributions(gift.contributions) !== 1 ? 's' : ''}
                  </p>
                </div>
                <button
                  onClick={() => handleContribute(gift.id)}
                  className="text-xs bg-[#EDE5D8] text-[#7D4E2D] px-4 py-2 rounded-full font-semibold hover:bg-[#C9A97A] transition"
                >
                  I'll contribute
                </button>
              </div>
            ))
          )}
        </div>

        {/* Side panel */}
        <div>
          <div className="bg-white rounded-xl p-5 border border-[#DDD3C6] mb-6">
            <p className="text-xs font-bold tracking-widest text-[#9A8878] uppercase mb-3">
              Invite friends
            </p>
            <p className="text-xs text-[#9A8878] mb-3 break-all">
              {window.location.origin}/join/{circle?.invite_token}
            </p>
            <button
              onClick={copyInviteLink}
              className="w-full bg-[#2C1F14] text-[#F7F2EB] py-2 rounded-lg text-sm font-semibold hover:bg-[#7D4E2D] transition"
            >
              {copied ? '✓ Copied!' : 'Copy invite link'}
            </button>
          </div>

          <div className="bg-white rounded-xl p-5 border border-[#DDD3C6]">
            <p className="text-xs font-bold tracking-widest text-[#9A8878] uppercase mb-3">
              Circle Info
            </p>
            <p className="text-sm text-[#2C1F14] mb-1">
              <span className="text-[#9A8878]">Occasion: </span>{circle?.occasion}
            </p>
            <p className="text-sm text-[#2C1F14] mb-1">
              <span className="text-[#9A8878]">For: </span>{circle?.recipient}
            </p>
            <p className="text-sm text-[#2C1F14]">
              <span className="text-[#9A8878]">Date: </span>{circle?.event_date || 'Not set'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CircleDetail