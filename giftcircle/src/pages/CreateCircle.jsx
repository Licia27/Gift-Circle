import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/layout/Navbar'

function CreateCircle() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [form, setForm] = useState({
    name: '',
    occasion: 'Birthday',
    recipient: '',
    event_date: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase
      .from('circles')
      .insert([{ ...form, created_by: user.id }])
      .select()
      .single()

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      navigate(`/circle/${data.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2EB]">
      <Navbar />
      <div className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-4xl text-[#2C1F14] mb-2"
            style={{ fontFamily: 'Georgia, serif' }}>
          Start a new circle
        </h1>
        <p className="text-sm text-[#9A8878] mb-10">
          Create a group for your occasion and invite people to contribute.
        </p>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-10 border border-[#DDD3C6] shadow-sm flex flex-col gap-6">
          <div>
            <label className="text-xs font-bold tracking-widest text-[#9A8878] uppercase block mb-2">
              Circle Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Thandi's 30th Birthday"
              className="w-full border border-[#DDD3C6] rounded-lg px-4 py-3 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold tracking-widest text-[#9A8878] uppercase block mb-2">
              Occasion
            </label>
            <select
              name="occasion"
              value={form.occasion}
              onChange={handleChange}
              className="w-full border border-[#DDD3C6] rounded-lg px-4 py-3 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
            >
              <option>Birthday</option>
              <option>Baby Shower</option>
              <option>Graduation</option>
              <option>Wedding</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold tracking-widest text-[#9A8878] uppercase block mb-2">
              Recipient Name
            </label>
            <input
              type="text"
              name="recipient"
              value={form.recipient}
              onChange={handleChange}
              placeholder="e.g. Thandiswa Nkosi"
              className="w-full border border-[#DDD3C6] rounded-lg px-4 py-3 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold tracking-widest text-[#9A8878] uppercase block mb-2">
              Event Date
            </label>
            <input
              type="date"
              name="event_date"
              value={form.event_date}
              onChange={handleChange}
              className="w-full border border-[#DDD3C6] rounded-lg px-4 py-3 text-sm bg-[#F7F2EB] focus:outline-none focus:border-[#7D4E2D]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#2C1F14] text-[#F7F2EB] py-3 rounded-lg font-semibold hover:bg-[#7D4E2D] transition"
          >
            {loading ? 'Creating...' : 'Create circle →'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateCircle