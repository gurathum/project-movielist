import { useEffect, useState } from 'react'
import MovieList from '../components/MovieList'
import axios from 'axios'
import { API_KEY } from '../config'

const HomePage = () => {
  const [movies, setMovies] = useState([])
  const [tvShows, setTvShows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPopularContent = async () => {
      setIsLoading(true)
      setError(null) // Clear any previous errors

      try {
        const movieResponse = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1`
        )
        const tvShowResponse = await axios.get(
          `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=en-US&page=1`
        )

        setMovies(movieResponse.data.results)
        setTvShows(tvShowResponse.data.results)
      } catch (error) {
        console.error('Error fetching popular content:', error)
        setError(error) // Set error state for handling
      } finally {
        setIsLoading(false)
      }
    }

    fetchPopularContent()
  }, [])

  return (
    <div className="flex flex-col justify-center p-4">
      <div className="flex items-end justify-between">
        <h2 className="mb-2 text-4xl font-bold">Popular Movies</h2>
        {isLoading && <p>Loading...</p>}
      </div>
      {error ? (
        <p>Error fetching movies: {error.message}</p>
      ) : (
        <MovieList movies={movies} />
      )}
      <div className="flex items-end justify-between">
        <h2 className="mt-12 mb-2 text-4xl font-bold">Popular TV Shows</h2>
      </div>
      {isLoading && <p>Loading...</p>}
      {error ? (
        <p>Error fetching TV Shows: {error.message}</p>
      ) : (
        <MovieList movies={tvShows} />
      )}
    </div>
  )
}

export default HomePage
