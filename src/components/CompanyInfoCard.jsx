import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { scanScenario, scenarioType } from '../data/scenarios'
import './CompanyInfoCard.scss'
import UserDetails from './UserDetails'

const CompanyInfoCard = ({ company }) => {
  const regularUser = company.user
  const regularReports = company.reports
  const elementaryUser = company.elementaryUser
  const elementaryReports = company.elementaryReports
  const regularSms = company.sms
  const elementarySms = company.elementarySms
  const [scenario, setScenario] = useState(scenarioType[scanScenario.noErrors])
  const navigate = useNavigate()

  const selectScenario = e => setScenario(scenarioType[e.target.value])
  const selectCompany = () => navigate(`/login?company=${company.id}&scenario=${scenario.value}`)

  return (
    <div className='company-info-card'>
      <div className='company-info-card-header'>
        <h3>{company.name}</h3>
      </div>
      {regularUser && (
        <UserDetails heading={'Regular User Details'} company={company} user={regularUser} reports={regularReports} sms={regularSms} />
      )}
      {elementaryUser && (
        <UserDetails
          heading={'Elementary User Details'}
          company={company}
          user={elementaryUser}
          reports={elementaryReports}
          sms={elementarySms}
        />
      )}
      <div className='company-info-scenarios company-info-container' style={{ color: 'red' }}>
        <select name='scenarios' id={`scenarios-${company.id}`} value={scenario.value} onChange={selectScenario}>
          {Object.entries(scenarioType).map(([k, v]) => (
            <option value={v.value} key={k} name={`scenario-${v.value}`}>
              {v.text}
            </option>
          ))}
        </select>
      </div>
      <div className='company-info-select-btn company-info-container' style={{ color: 'red' }}>
        <button onClick={() => selectCompany()} id={`proceed-to-${company.id}`}>
          Select Scenario and Company
        </button>
      </div>
    </div>
  )
}

export default CompanyInfoCard
