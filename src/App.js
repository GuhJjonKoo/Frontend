import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import EgoGift from './pages/EgoGift'
import CardPack from './pages/CardPack'
import Event from './pages/Event'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/egogift" element={<EgoGift />} />
          <Route path="/cardpack" element={<CardPack />} />
          <Route path="/event" element={<Event />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App