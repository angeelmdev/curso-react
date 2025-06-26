import { lazy } from 'react'

import './App.css'
import { Router } from './Router.jsx';
import Page404 from './pages/404.jsx';
import SearchPage from './pages/Search.jsx';
import { Route } from './Route.jsx';
import { Suspense } from 'react';

const LazyHomePage = lazy(() => import('./pages/Home.jsx'))
const LazyAboutPage = lazy(() => import('./pages/About.jsx'))

const routes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/buscador/:query',
    Component: SearchPage
  }
]

function App() {

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={routes} defaultComponent={Page404} >
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
