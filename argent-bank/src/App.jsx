import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Index from './pages/Index'
import SignIn from './pages/SignIn'
import User from './pages/User'
import NotFound from './pages/NotFound'
import './styles/global.scss'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Index />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={<User />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
