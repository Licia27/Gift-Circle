import { Link } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'

function Landing() {
  return (
    <div className="min-h-screen bg-[#F7F2EB]">
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-2 gap-12 items-center">
        
        {/* Left */}
        <div>
          <p className="text-xs tracking-widest text-[#C9A97A] uppercase mb-4">
            Gifting, together
          </p>
          <h1 className="text-6xl font-light text-[#2C1F14] leading-tight mb-6"
              style={{ fontFamily: 'Georgia, serif' }}>
            Every gift <br />
            <em className="text-[#7D4E2D]">more</em> meaningful.
          </h1>
          <p className="text-lg text-[#9A8878] mb-10 leading-relaxed">
            Create a circle, build a wishlist, and track who's contributing — 
            so the people you love get exactly what they want.
          </p>
          <div className="flex gap-4">
            <Link
              to="/signup"
              className="bg-[#2C1F14] text-[#F7F2EB] px-8 py-3 rounded-full font-semibold hover:bg-[#7D4E2D] transition"
            >
              Start a circle →
            </Link>
            <Link
              to="/login"
              className="border border-[#DDD3C6] text-[#2C1F14] px-8 py-3 rounded-full hover:border-[#2C1F14] transition"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Right — Preview Cards */}
        <div className="flex flex-col gap-4">
          {[
            { emoji: '🎂', title: "Thandi's 30th Birthday", sub: '6 people · R1 800 goal', pct: 72 },
            { emoji: '🌿', title: "Kemi's Baby Shower", sub: '11 people · R3 200 goal', pct: 45 },
            { emoji: '🎓', title: "Lebo's Graduation", sub: '4 people · R900 goal', pct: 100 },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-[#DDD3C6]">
              <div className="w-12 h-12 rounded-xl bg-[#EDE5D8] flex items-center justify-center text-2xl">
                {card.emoji}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#2C1F14] text-sm">{card.title}</p>
                <p className="text-xs text-[#9A8878] mb-2">{card.sub}</p>
                <div className="h-1.5 bg-[#DDD3C6] rounded-full">
                  <div
                    className="h-1.5 bg-[#7D4E2D] rounded-full"
                    style={{ width: `${card.pct}%` }}
                  />
                </div>
              </div>
              <span className="text-xs font-bold text-[#7D4E2D]">{card.pct}%</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Landing