import './UserDetails.scss'

const UserDetails = ({ heading, company, user, reports, sms }) => {
  return (
    <div className='user-info'>
      <div className='user-info-header user-info-container'>
        <h4>{heading}</h4>
      </div>
      <div className='user-details'>
        {company.authFields.map(field => (
          <div className='user-details-pair  user-info-container' key={field} id={`authfield-${user[field]}${company.id}`}>
            <div className='user-details-name'>{field}</div>
            <div className='user-details-value'>{user[field]}</div>
          </div>
        ))}
        {reports && (
          <div className='user-details-pair  user-info-container'>
            <div className='user-details-name'>Reports Count</div>
            <div className='user-details-value'>{reports.length}</div>
          </div>
        )}
        <div className='user-details-pair  user-info-container'>
          <div className='user-details-name'>SMS code</div>
          <div className='user-details-value'>{sms}</div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails
