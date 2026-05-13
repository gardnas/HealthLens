import './App.css'
import Home from './frontend/Home'
import Map from './frontend/Map'
import About from './frontend/About'
import Primer from './frontend/Primer'
import Resources from './frontend/Resources'
import FAQ from './frontend/FAQ'
import { HashRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/primer" element={<Primer />} />
        <Route path="/about" element={<About />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/map" element={<Map />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/faq" element={<FAQ />} />
      </Routes>
    </HashRouter>
  )
}

export default App
