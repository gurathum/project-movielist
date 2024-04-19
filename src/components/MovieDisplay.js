import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import { API_KEY } from '../config'

const MovieDisplay = () => {
  const [movieData, setMovieData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { id, media_type } = useParams() // Access movie ID from route parameters

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}`
        )
        const data = response.data
        setMovieData(data)
      } catch (error) {
        console.error('Error fetching movie details:', error)
      } finally {
        setIsLoading(false)
        console.log('rendered')
      }
    }

    fetchMovieDetails()
  }, [id, media_type]) // Re-run effect when ID changes

  if (isLoading) return <p>Loading ...</p>
  if (!movieData) return <p>Movie Not Found!</p>

  return (
    <div className="relative bg-gray-900">
      <img
        src={`https://image.tmdb.org/t/p/original${movieData.poster_path}`}
        alt={movieData.title}
        className="absolute top-0 left-0 object-cover w-full h-screen -z-10"
      />
      {/**<div className="absolute inset-0 z-0 bg-gray-900 bg-opacity-50"></div>*/}
      <div className="container z-30 px-4 py-8 mx-auto text-center text-white">
        <h2 className="text-3xl font-bold">
          {media_type === 'movie' ? movieData.title : movieData.name}{' '}
          <span className="px-2 py-1 mr-2 text-[12px] font-bold text-blue-800 uppercase rounded-sm bg-sky-200">
            {media_type === 'movie'
              ? movieData.release_date.slice(0, 4)
              : movieData.first_air_date.slice(0, 4)}
          </span>
        </h2>
        {movieData.genres.map((genre) => (
          <span
            key={genre.id}
            className="px-2 py-1 mr-2 text-[12px] font-bold text-blue-800 uppercase rounded-sm bg-sky-200"
          >
            {genre.name}
          </span>
        ))}
        <p className="mt-4">{movieData.overview}</p>
        <p>
          <FaStar className="inline" /> {movieData.vote_average.toFixed(1)} / 10
        </p>
      </div>
    </div>
  )
}

export default MovieDisplay
