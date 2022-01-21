import React from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { companiesData } from '../data/companies'
import { authType } from '../types/authType'
import './MainPage.scss'

const MainPage = () => {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const company = companiesData.find(company => company.id == params.companyId)
  const auth = searchParams.get('auth')
  const reportsType =
    auth === authType.elementary ? `${authType.elementary}Reports` : 'reports'

  return (
    <div className='main-page'>
      <header className='page-header'>
        <div className='container'>
          <h3>{company.name}</h3>
        </div>
      </header>
      <div className='page-content'>
        <div className='container'>
          <h4>Main Page: {params.companyId}</h4>
          {company[reportsType].map(report => (
            <div key={report}>
              <button>{report}</button>
            </div>
          ))}
          <Link to='/'>Home</Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage
