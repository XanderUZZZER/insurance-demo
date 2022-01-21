let valuesCounter = 0

export const scenarioType = {
  noErrors: { text: 'No Errors', value: valuesCounter++ },
  vaultReset: { text: 'Vault Credentials Reset Required', value: valuesCounter++ },
  elementNotFound: { text: 'Element Not Found', value: valuesCounter++ },
  loginReset: { text: 'Credentials Reset Required', value: valuesCounter++ }

}

export const scenarios = Object.values(scenarioType)