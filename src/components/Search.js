import { useState } from 'react'
import { Form, InputGroup, FormControl } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MyButton from './MyButton'

const API_KEY = process.env.API_KEY || process.env.REACT_APP_API_KEY

export default function Search() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!searchTerm) return // Handle empty search terms
    const encodedTerm = encodeURIComponent(searchTerm)
    setIsLoading(true)
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodedTerm}&include_adult=false&page=1`
      )
      const data = response.data
      const movies = data.results
      setIsLoading(false)
      navigate(`/search?q=${encodedTerm}`, { state: { movies } })
    } catch (error) {
      console.log(error)
      setIsLoading(false)
    }
  }

  return (
    <div className="search-container">
      <Form onSubmit={handleSubmit}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Movies or TV Shows"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <MyButton type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 ..."
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              <span></span>
            )}
            Search
          </MyButton>
        </InputGroup>
      </Form>
    </div>
  )
}
