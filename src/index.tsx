import Loading from './components/Loading'
import './index.css'
import TypingPage from './pages/Typing'
import { isOpenDarkModeAtom } from '@/store'
import 'animate.css'
import { useAtomValue } from 'jotai'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import 'react-app-polyfill/stable'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const GalleryPage = lazy(() => import('./pages/Gallery'))

function Root() {
  const darkMode = useAtomValue(isOpenDarkModeAtom)
  useEffect(() => {
    document.documentElement.classList.add('dark')
    // darkMode ? document.documentElement.classList.add('dark') : document.documentElement.classList.remove('dark')
  }, [darkMode])

  useEffect(() => {
    const handleResize = () => {
      window.location.href = '/'
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <React.StrictMode>
      <BrowserRouter basename={REACT_APP_DEPLOY_ENV === 'pages' ? '/DeutschLerner' : ''}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {
              <>
                <Route index element={<TypingPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/*" element={<Navigate to="/" />} />
              </>
            }
          </Routes>
        </Suspense>
      </BrowserRouter>
    </React.StrictMode>
  )
}

const container = document.getElementById('root')

container && createRoot(container).render(<Root />)
