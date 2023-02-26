import { useContext, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/logo-blog.png'
import '../assets/hamburgers.css'
import { AuthContext } from '../context/authContext'
import Loader from './Loader'

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext)

  const [loading, setLoading] = useState(false)

  const buttonMenu = useRef()
  const menu = useRef()

  const handleClickMenu = e => {
    if (buttonMenu.current.classList.contains('is-active')) {
      buttonMenu.current.classList.remove('is-active')
      menu.current.classList.remove('left-0')
      menu.current.classList.add('-left-full')
    } else {
      buttonMenu.current.classList.add('is-active')
      menu.current.classList.add('left-0')
      menu.current.classList.remove('-left-full')
    }
  }

  const handleLogout = async e => {
    try {
      setLoading(true)
      await logout()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <nav className='bg-gray-800 text-white fixed z-20 w-full'>
      {loading && <Loader format='z-40' />}
      <div className='container max-w-5xl mx-auto flex justify-center md:justify-between'>
        <NavLink className='self-center md:self-auto' to='/'>
          <img className='w-14 m-2' src={logo} alt='logo' />
        </NavLink>
        <ul
          ref={menu}
          className='-left-full absolute bg-gray-800 w-full min-h-screen flex flex-col justify-center text-center z-20 transition-all delay-100 md:static md:flex-row md:min-h-0 md:w-auto md:mr-4 md:items-center'
        >
          <li>
            <NavLink
              onClick={handleClickMenu}
              className='nav-link'
              to='/?cat=food'
            >
              Food
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClickMenu}
              className='nav-link'
              to='/?cat=design'
            >
              Design
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClickMenu}
              className='nav-link'
              to='/?cat=cinema'
            >
              Cinema
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClickMenu}
              className='nav-link'
              to='/?cat=science'
            >
              Science
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClickMenu}
              className='nav-link'
              to='/?cat=art'
            >
              Art
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleClickMenu}
              className='nav-link'
              to='/?cat=technology'
            >
              Tech
            </NavLink>
          </li>
          {!currentUser && (
            <>
              <li>
                <NavLink
                  onClick={handleClickMenu}
                  className='nav-link'
                  to='/register'
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  onClick={handleClickMenu}
                  className='nav-link'
                  to='/login'
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
          {currentUser && (
            <>
              <li>
                <NavLink
                  to='/dashboard'
                  onClick={e => {
                    handleClickMenu(e)
                  }}
                  className='nav-link md:border md:border-white md:rounded md:px-2 md:hover:border-gray-300'
                >
                  <i class='fa-regular fa-user' /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/write'
                  onClick={e => {
                    handleClickMenu(e)
                  }}
                  className='nav-link md:border md:border-white md:rounded md:px-2 md:hover:border-gray-300'
                >
                  <i class='fa-solid fa-pen-to-square' /> Write
                </NavLink>
              </li>
              <li>
                <button
                  onClick={e => {
                    handleLogout(e)
                    handleClickMenu(e)
                  }}
                  className='nav-link md:border md:border-white md:rounded md:px-2 md:hover:border-gray-300 w-full'
                >
                  <i class='fa-solid fa-right-from-bracket' /> Logout
                </button>
              </li>
            </>
          )}
        </ul>

        <button
          className='hamburger hamburger--emphatic fixed bottom-0 right-0 z-30 md:hidden'
          type='button'
          onClick={handleClickMenu}
          ref={buttonMenu}
        >
          <span className='hamburger-box'>
            <span className='hamburger-inner' />
          </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
