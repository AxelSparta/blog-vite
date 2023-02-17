import { useRouteError } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function ErrorPage () {
  const error = useRouteError()

  return (
    <>
      <Navbar />
      <div
        className='bg-white flex flex-col justify-center align-middle text-center text-gray-800 min-h-screen'
        id='error-page'
      >
        <h1 className='text-4xl font-bold '>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className='text-red-700'>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
      <Footer />
    </>
  )
}
