import { RouterProvider, Outlet, createHashRouter } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import { AuthContexProvider } from './context/authContext'
import Dashboard from './pages/Dashboard'
import ErrorPage from './pages/Error'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Single from './pages/Single'
import Write from './pages/Write'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/post/:id',
        element: <Single />
      },
      {
        path: '/write',
        element: <Write />
      },
      {
        path: '/blog/:id',
        element: <Single />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/edit/:postId',
        element: <Write />
      }
    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
])

const App = () => {
  return (
    <AuthContexProvider>
      <RouterProvider router={router} />
    </AuthContexProvider>
  )
}

export default App
