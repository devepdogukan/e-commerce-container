import { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Loader from './components/loader'
import HomePage from './pages/home'
import ErrorBoundary from './components/error-boundary'
import Layout from './components/layout'

const Auth = lazy(() => import('userAuthenticationApp/UserAuthentication'))
const OrderHistory = lazy(() => import('orderHistoryApp/OrderHistory'))

const App = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleNavigation = (event: CustomEvent<string>) => {
      navigate(event.detail, { replace: true })
    }

    window.addEventListener('navigate', handleNavigation as EventListener)

    return () => {
      window.removeEventListener('navigate', handleNavigation as EventListener)
    }
  }, [navigate])

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
