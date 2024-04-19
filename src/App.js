import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MovieDisplay from './components/MovieDisplay'
import HomePage from './pages/HomePage'
import SearchResults from './pages/SearchResults'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:media_type/:id" element={<MovieDisplay />} />
        <Route path="/search" element={<SearchResults />} />
      </Routes>
    </div>
  )
}

export default App
