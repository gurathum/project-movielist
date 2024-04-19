import { Link } from 'react-router-dom'
import Search from './Search'

export default function Navbar() {
  return (
    <div className="bg-gray-800">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="items-center hidden px-2 md:flex lg:px-0">
            <div className="flex-shrink-0">
              <Link to={'/'}>
                <img
                  className="block w-auto h-8 lg:hidden"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
                <img
                  className="hidden w-auto h-8 lg:block"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                  alt="Your Company"
                />
              </Link>
            </div>
          </div>
          <Link
            to={'/'}
            className="font-bold text-white md:no-underline md:text-3xl hover:underline"
          >
            Project Movie List
          </Link>
          <Search />
        </div>
      </div>
    </div>
  )
}
