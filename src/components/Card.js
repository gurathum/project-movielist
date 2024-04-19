import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ movie }) => {
  const { title, poster_path, name } = movie

  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`
  const url =
    movie.media_type === 'movie' ? `/movie/${movie.id}` : `/tv/${movie.id}`
  return (
    <Link to={url}>
      <div className="overflow-hidden transition duration-300 ease-in-out rounded-lg shadow-xl cursor-pointer group hover:bg-opacity-75 hover:shadow-2xl max-w-52">
        <img
          src={imageUrl}
          alt={title}
          className="object-cover w-full h-auto"
        />
        <p className="py-2 text-center text-md group-hover:underline">
          {movie.media_type === 'movie' ? title : name}
        </p>
      </div>
    </Link>
  )
}

export default Card
