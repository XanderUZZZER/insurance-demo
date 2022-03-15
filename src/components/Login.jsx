import { useRef } from 'react'
import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { companiesData } from '../data/companies'
import { scanScenario, scenarioType } from '../data/scenarios'
import { authFieldType } from '../types/authFieldTypes'
import { authType } from '../types/authType'
import './Login.scss'
import UserDetails from './UserDetails'

const SMS_WAITING_TIMEOUT = 5 * 60 * 1000 // 5 mins

const Login = () => {
  const [searchParams] = useSearchParams()
  const companyId = searchParams.get('company')
  const company = companiesData.find(company => company.id == companyId)
  const scenarioId = searchParams.get('scenario')
  const scenario = scenarioType[scenarioId]

  const regularUser = company.user
  const regularReports = company.reports
  const elementaryUser = company.elementaryUser
  const elementaryReports = company.elementaryReports
  const regularSms = company.sms
  const elementarySms = company.elementarySms
  const hasVaultUser = company.authFields.includes(authFieldType.vaultUserName)

  const credentialsInitial = company.authFields
    .filter(
      field =>
        field === authFieldType.userName ||
        field === authFieldType.password ||
        field === authFieldType.vaultUserName ||
        field === authFieldType.vaultPassword
    )
    //.reduce((arr, currfield) => ({ ...arr, [currfield]: '' }), {})
    .reduce(
      (arr, currfield) => ({ ...arr, [currfield]: company.user[currfield] }),
      {}
    )
  const [credentials, setCredentials] = useState(credentialsInitial)
  const [loginError, setLoginError] = useState(null)
  const [auth, setAuth] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [sms, setSms] = useState(company.sms)
  const [correctSms, setCorrectSms] = useState(false)
  const [smsError, setSmsError] = useState(null)
  const [vaultLoginError, setVaultLoginError] = useState(null)
  let smsWaitingTimer = useRef(null)

  const navigate = useNavigate()

  const setCredentialsHandler = e => {
    setLoginError(null)
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const setSmsHandler = e => {
    setSms(e.target.value)
  }

  const loginHandler = e => {
    e.preventDefault()
    if (
      scenario.value === scanScenario.loginError ||
      scenario.value === scanScenario.passwordExpired
    ) {
      setLoginError(scenario.text)
    } else if (
      company.user.userName === credentials['userName'] &&
      company.user.password === credentials['password']
    ) {
      setAuth(authType.regular)
      setLoggedIn(true)
    } else if (
      company.elementaryUser &&
      company.elementaryUser.userName === credentials['userName'] &&
      company.elementaryUser.password === credentials['password']
    ) {
      setAuth(authType.elementary)
      setLoggedIn(true)
    } else {
      setLoginError(scenarioType[scanScenario.loginError].text)
    }
  }

  const vaultLoginHandler = e => {
    e.preventDefault()
    if (
      scenario.value === scanScenario.vaultExpired ||
      scenario.value === scanScenario.vaultLoginError
    ) {
      setVaultLoginError(scenario.text)
    } else if (
      company.user.vaultUserName === credentials['vaultUserName'] &&
      company.user.vaultPassword === credentials['vaultPassword']
    ) {
      proceedToReportsPage()
    } else if (
      company.elementaryUser &&
      company.elementaryUser.vaultUserName === credentials['vaultUserName'] &&
      company.elementaryUser.vaultPassword === credentials['vaultPassword']
    ) {
      proceedToReportsPage()
    } else {
      setVaultLoginError(scenarioType[scanScenario.vaultLoginError].text)
    }
  }

  const checkSmsHandler = e => {
    e.preventDefault()
    console.log(scenario)
    if (smsError !== scenarioType[scanScenario.smsTimeout].text) {
      if (
        scenario.value === scanScenario.invalidSms ||
        scenario.value === scanScenario.smsTimeout ||
        scenario.value === scanScenario.unexpectedPage
      ) {
        setSmsError(scenario.text)
      } else if (
        (regularSms && regularSms === sms) ||
        (elementarySms && elementarySms === sms)
      ) {
        setSmsError(null)
        setCorrectSms(true)
        if (!hasVaultUser) {
          proceedToReportsPage()
        }
      } else {
        setSmsError(scenarioType[scanScenario.invalidSms].text)
      }
    }
    if (scenario.value === scanScenario.unexpectedPage) {
      console.log(scenario)
      setSmsError(scenarioType[scanScenario.unexpectedPage].text)
    }
  }

  const proceedToReportsPage = () => navigate(buildUrl(auth))

  const buildUrl = authType =>
    `/${company.id}?auth=${authType}&scenario=${scenario.value}`

  useEffect(() => {
    if (
      loggedIn &&
      !correctSms &&
      smsError !== scenarioType[scanScenario.smsTimeout].text
    ) {
      clearTimeout(smsWaitingTimer.current)
      smsWaitingTimer.current = setTimeout(() => {
        setSmsError(scenarioType[scanScenario.smsTimeout].text)
      }, SMS_WAITING_TIMEOUT)
    } else if (correctSms) {
      clearTimeout(smsWaitingTimer.current)
    }
    return () => clearTimeout(smsWaitingTimer.current)
  }, [loggedIn, smsError, sms, correctSms])

  return (
    <div className='login-card' id={`card${company.id}`}>
      <div className='login-card-header'>
        <h3>{company.name}</h3>
      </div>
      <div className='login-details'>
        {regularUser && (
          <UserDetails
            heading={'Regular User Details'}
            company={company}
            user={regularUser}
            reports={regularReports}
            sms={regularSms}
          />
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
      </div>
      <div className='login-scenario-details'>
        <div>Selected Scenario: </div>
        <div className='login-scenario-details-type'>{scenario.text}</div>
      </div>
      <div className='login-inputs'>
        <div>Enter Credentials</div>
        <form action='' className='login-credentials-form'>
          {company.authFields
            .filter(
              field =>
                field === authFieldType.userName ||
                field === authFieldType.password
            )
            .map(field => (
              <input
                key={`${field}${company.id}`}
                type={
                  field.toLowerCase().includes('password') ? 'password' : 'text'
                }
                placeholder={field}
                id={`${field}${company.id}`}
                name={field}
                value={credentials[field]}
                onChange={setCredentialsHandler}
              />
            ))}
          <div className='error' id={`error-login-${company.id}`}>
            {loginError}
          </div>
          <button onClick={loginHandler} id={`proceed-to-${company.id}`}>
            Login
          </button>
        </form>
      </div>
      {loggedIn && (
        <div className='login-inputs'>
          <div>Enter SMS</div>
          <form action='' className='login-credentials-form'>
            <input
              key={`sms${company.id}`}
              type={'text'}
              placeholder={'sms'}
              id={`sms${company.id}`}
              name={'sms'}
              value={sms}
              onChange={setSmsHandler}
            />
            <div className='error' id={`error-sms-${company.id}`}>
              {smsError}
            </div>
            <button onClick={checkSmsHandler} id={`send-sms-${company.id}`}>
              Send Sms
            </button>
          </form>
        </div>
      )}
      {hasVaultUser && correctSms && !smsError && (
        <div className='login-inputs'>
          <div>Enter Vault Credentials</div>
          <form action='' className='login-credentials-form'>
            {company.authFields
              .filter(
                field =>
                  field === authFieldType.vaultUserName ||
                  field === authFieldType.vaultPassword
              )
              .map(field => (
                <input
                  key={`${field}${company.id}`}
                  type={
                    field.toLowerCase().includes('password')
                      ? 'password'
                      : 'text'
                  }
                  placeholder={field}
                  id={`${field}${company.id}`}
                  name={field}
                  value={credentials[field]}
                  onChange={setCredentialsHandler}
                />
              ))}
            <div className='error' id={`error-vault-login-${company.id}`}>
              {vaultLoginError}
            </div>
            <button
              onClick={vaultLoginHandler}
              id={`vault-login-${company.id}`}
            >
              Vault Login
            </button>
          </form>
        </div>
      )}
      <div className='back-link'>
        <Link to={'/'}>Go Back To Companies</Link>
      </div>
    </div>
  )
}

export default Login
