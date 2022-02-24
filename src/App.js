import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Chat from './components/chat/Chat'
import Excel from './components/excel/Excel'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import { companiesData } from './data/companies'
import CompaniesPage from './Views/CompaniesPage'
import MainPage from './Views/MainPage'

function App() {
  const companies = companiesData

  return (
    <div className='app-container' dir='rtl'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompaniesPage companies={companies} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/:companyId' element={<MainPage />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/ex' element={<Excel />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
