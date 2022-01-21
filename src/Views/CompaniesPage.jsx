import React from 'react'
import LoginCard from '../components/LoginCard'
import './CompaniesPage.css'

const CompaniesPage = ({ companies }) => {
  console.log(companies)
  return (
    <div className='companies-container'>
      {companies.map(company => (
        <LoginCard key={company.id} company={company} />
      ))}
    </div>
  )
}

export default CompaniesPage
