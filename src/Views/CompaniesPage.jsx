// import LoginCard from '../components/LoginCard'
import CompanyInfoCard from '../components/CompanyInfoCard'
import './CompaniesPage.css'

const CompaniesPage = ({ companies }) => {
  return (
    <>
      <div className='companies-container'>
        {companies.map(company => (
          <CompanyInfoCard key={company.id} company={company} />
        ))}
      </div>
      {/* <div className='companies-container'>
        {companies.map(company => (
          <LoginCard key={company.id} company={company} />
        ))}
      </div> */}
    </>
  )
}

export default CompaniesPage
