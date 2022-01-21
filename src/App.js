import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { companiesData } from './data/companies';
import CompaniesPage from './Views/CompaniesPage';
import MainPage from './Views/MainPage';

function App() {
  const user = { user: true }
  const companies = companiesData

  return (
    <div className='app-container' dir='rtl'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CompaniesPage companies={companies} />} />
          <Route path='/:companyId' element={<MainPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
