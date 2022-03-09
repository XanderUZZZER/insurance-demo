import { authFieldType } from '../types/authFieldTypes'

export const companiesData = [
  {
    id: 1001,
    name: 'Srulik',
    authFields: [authFieldType.userName, authFieldType.password, authFieldType.answer],
    user: {
      userName: 'user',
      password: 'password',
      answer: 'answer',
    },
    reports: [1001],
    sms: '11111111',
  },
  {
    id: 1002,
    name: 'Lukhanin',
    authFields: [
      authFieldType.userName,
      authFieldType.password,
      authFieldType.vaultUserName,
      authFieldType.vaultPassword,
      authFieldType.answer,
    ],
    user: {
      userName: 'user',
      password: 'password',
      vaultUserName: 'vaultUser',
      vaultPassword: 'vaultPassword',
      answer: 'answer',
    },
    reports: [1002, 1003],
    sms: '11111111',
  },
  {
    id: 1003,
    name: 'Ledok',
    authFields: [authFieldType.userName, authFieldType.password, authFieldType.answer],
    user: {
      userName: 'user',
      password: 'password',
      answer: 'answer',
    },
    elementaryUser: {
      userName: 'elementaryUser',
      password: 'password',
      answer: 'answer',
    },
    reports: [1005, 1006],
    elementaryReports: [1004],
    sms: '11111111',
    elementarySms: '11111111',
  },
]
