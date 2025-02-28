import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import Header from '@/components/custom/Header.tsx'
import CreateTrip from '@/trip/CreateTrip.tsx'
import Footer from '@/components/custom/Footer.tsx'

import supabase from './lib/supabaseClient.ts' // Import Supabase client
import { Toaster } from "@/components/ui/sonner"
import MyTrips from './trip/MyTrips.tsx'
import TripPreview from './trip/TripPreview.tsx'

// Layout Component to wrap header/footer around pages
const Layout = () => (
  <>
    <Header />
    <Toaster />
    <Outlet /> {/* This renders the matched child route */}
    <Footer />
  </>
)

// Protected Route Component
const ProtectedRoute = () => {
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }
    fetchSession()
  }, [])

  if (loading) return <div>Loading...</div>

  return session ? <Outlet /> : <Navigate to="/" replace />
}

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Wrap with layout
    children: [
      { path: '/', element: <App /> },
      { 
        path: '/create-trip',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <CreateTrip /> }]
      },
      { 
        path: '/trip/:tripId',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <TripPreview /> }]
      },
      { 
        path: '/my-trips',
        element: <ProtectedRoute />,
        children: [{ path: '', element: <MyTrips /> }]
      }
    ]
  }
])

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
