import MovieList from '../components/MovieList'
import { useLocation } from 'react-router-dom'

const SearchResults = () => {
  const location = useLocation()
  const movies = location.state?.movies || []
  const isLoading = movies.length === 0
  const searchParams = new URLSearchParams(location.search)
  const searchTerm = searchParams.get('q')

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="flex items-end justify-between">
        <h2 className="mb-5 text-2xl font-bold">
          Search Results for {searchTerm}
        </h2>
      </div>
      {isLoading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  )
}

export default SearchResults
