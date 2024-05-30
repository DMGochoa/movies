import { useRoutes, BrowserRouter } from 'react-router-dom'
import MovieTable from './../MovieTable'
import Navbar from './../../components/Navbar'
import './App.css'

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/', element: <MovieTable /> },

  ])

  return routes
}

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className='content-container'>
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}

export default App
