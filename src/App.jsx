import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { FoundationPage } from './pages/FoundationPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="*" element={<FoundationPage />} />
      </Route>
    </Routes>
  )
}
