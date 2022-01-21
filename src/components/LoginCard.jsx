import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { scenarios, scenarioType } from '../data/scenarios'
import { LOGIN } from '../redux/actionTypes'
import { authFieldType } from '../types/authFieldTypes'
import { authType } from '../types/authType'
import './LoginCard.scss'

const LoginCard = ({ company }) => {
  console.log(company)
  const initialValues = company.authFields
    .filter(
      field =>
        field === authFieldType.userName || field === authFieldType.password
    )
    .reduce((arr, currfield) => ({ ...arr, [currfield]: '' }), {})

  const [values, setValues] = useState(initialValues)
  const [scenario, setScenario] = useState(scenarios[0])
  const [loginError, setLoginError] = useState(null)
  const [loggedin, setLoggedin] = useState(false)
  const [auth, setAuth] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const login = () => {
    if (scenario === scenarioType.loginReset) {
      setLoginError(scenario.text)
    } else if (!loginError && loggedin) {
      dispatch({ type: LOGIN, payload: auth })
      navigate(buildUrl(auth))
    }
  }

  const checkLogin = authType => {
    setAuth(authType)
    if (scenario === scenarioType.loginReset) {
      setLoginError(scenario.text)
    } else {
      setLoggedin(true)
      // dispatch({ type: LOGIN, payload: authType })
      // navigate(buildUrl(authType))
    }
  }
  const checkLoginHandler = () => {
    if (
      company.user.userName === values['userName'] &&
      company.user.password === values['password']
    ) {
      checkLogin(authType.regular)
    } else if (
      company.elementaryUser &&
      company.elementaryUser.userName === values['userName'] &&
      company.elementaryUser.password === values['password']
    ) {
      checkLogin(authType.elementary)
    } else {
      setLoginError('Invalid Credentials')
    }
  }

  const handleInputChange = e => {
    setLoginError(null)
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleRadioChange = e => {
    setScenario(scenarios.find(scenario => scenario.value == e.target.value))
  }

  const buildUrl = authType =>
    `/${company.id}?auth=${authType}&scenario=${scenario.value}`

  useEffect(() => {
    if (loginError) {
      setTimeout(() => {
        setLoginError(null)
      }, 5000)
    }
  }, [loginError])

  return (
    <div className='login-card' id={`card${company.id}`}>
      <div className='card-header'>
        <h3>{company.name}</h3>
      </div>
      <div className='card-body'>
        {company.user && (
          <div className='user-details'>
            <h4>User Details</h4>
            <div className='user-details-grid'>
              <div className='user-details-header'>user name</div>
              <div className='user-details-header'>user password</div>
              <div className='user-details-header'>Reports Count</div>
              <div>{company.user.userName}</div>
              <div>{company.user.password}</div>
              <div>{company.reports.length}</div>
            </div>
          </div>
        )}
        {company.elementaryUser && (
          <div className='user-details'>
            <h4>Elementary User Details</h4>
            <div className='user-details-grid'>
              <div className='user-details-header'>user name</div>
              <div className='user-details-header'>user password</div>
              <div className='user-details-header'>Reports Count</div>
              <div>{company.elementaryUser.userName}</div>
              <div>{company.elementaryUser.password}</div>
              <div>{company.elementaryReports.length}</div>
            </div>
          </div>
        )}
        {loggedin && (
          <div className='scenarios'>
            <h4>Scenarios</h4>
            <div>
              {scenarios.map((scenario, i) => (
                <div key={scenario.value}>
                  <input
                    type='radio'
                    id={`${scenario.value}${company.id}`}
                    name={'scenarioFor' + company.id}
                    value={scenario.value}
                    defaultChecked={i === 0 ? true : false}
                    onChange={handleRadioChange}
                  />
                  <label htmlFor={`${scenario.value}${company.id}`}>
                    {scenario.text}
                  </label>
                </div>
              ))}
              <button onClick={login} id={`proceedToReports${company.id}`}>
                Choose Scenario and Login
              </button>
            </div>
          </div>
        )}
      </div>
      <div className='form-container'>
        <form>
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
                value={values[field]}
                onChange={handleInputChange}
              />
            ))}
          <input
            type='button'
            value='Check Login'
            onClick={checkLoginHandler}
            id={`button${company.id}`}
          />
          {loginError !== null && (
            <div className='error' id={`error${company.id}`}>
              {loginError}
            </div>
          )}
        </form>
      </div>

      <div className='links-container'>
        <Link
          to={buildUrl(authType.regular)}
          onClick={() => dispatch({ type: LOGIN, payload: authType.regular })}
        >
          Login as regular
        </Link>
        {company.elementaryUser && (
          <Link
            to={buildUrl(authType.elementary)}
            onClick={() =>
              dispatch({ type: LOGIN, payload: authType.elementary })
            }
          >
            Login as elementary
          </Link>
        )}
      </div>
    </div>
  )
}

export default LoginCard
