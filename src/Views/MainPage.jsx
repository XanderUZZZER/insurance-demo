import React from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { companiesData } from '../data/companies'
import { scanScenario, scenarioType } from '../data/scenarios'
import { authType } from '../types/authType'
import './MainPage.scss'

const MainPage = () => {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const scenarioId = searchParams.get('scenario')

  const company = companiesData.find(company => company.id == params.companyId)
  const scenario = scenarioType[scenarioId]
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
          <h4>Reports Page: {company.name}</h4>
          <h4>Auth Type: {auth}</h4>
          <h4>Reports Count: {company[reportsType].length}</h4>
          <h4>
            Scenario: <span className='text-red'>{scenario.text}</span>
          </h4>
          <div className='reports-container'>
            {company[reportsType].map((report, i) => (
              <div key={report} className='report-container'>
                {scenario.value === scanScenario.elementNotFound && i === 0 ? (
                  <div className='not-found'>{`Report ${report} not found`}</div>
                ) : (
                  <a
                    href={`/files/${report}.xlsx`}
                    download
                    id={`report-id-${report}`}
                  >{`Download ${report} report`}</a>
                )}
              </div>
            ))}
          </div>
          <Link to='/'>Home</Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage
