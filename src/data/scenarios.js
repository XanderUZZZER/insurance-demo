export const scanScenario = {
  noErrors: 0,
  loginError: 1,
  passwordExpired: 2,
  invalidSms: 3,
  smsTimeout: 4, // 5 minutes
  vaultLoginError: 5,
  vaultExpired: 6,
  elementNotFound: 7,
}

export const scenarioType = {
  [scanScenario.noErrors]: { text: 'No Errors', value: scanScenario.noErrors },
  [scanScenario.loginError]: { text: 'Login Error', value: scanScenario.loginError },
  [scanScenario.passwordExpired]: { text: 'Password Expired', value: scanScenario.passwordExpired },
  [scanScenario.invalidSms]: { text: 'Invalid SMS code', value: scanScenario.invalidSms },
  [scanScenario.smsTimeout]: { text: 'SMS code waiting timeout', value: scanScenario.smsTimeout },
  [scanScenario.vaultLoginError]: { text: 'Vault Login Error', value: scanScenario.vaultLoginError },
  [scanScenario.vaultExpired]: { text: 'Vault Password Expired', value: scanScenario.vaultExpired },
  [scanScenario.elementNotFound]: { text: 'Element not Found', value: scanScenario.elementNotFound },

  // CrentailsError
  // PasswordExpired
  // InvalidSMS
  // SMSTimeOut (automatic 5 minutes)
}

export const scenarios = Object.values(scenarioType)
