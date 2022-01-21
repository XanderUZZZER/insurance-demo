import { authFieldType } from '../types/authFieldTypes';
import { userType } from '../types/userTypes';

let id = 1
const getId = () => id++
export const companiesData = [
  {
    id: 101,
    name: 'Company 101',
    authFields: [
      authFieldType.userName,
      authFieldType.password,
      authFieldType.vaultUserName,
      authFieldType.vaultPassword
    ],
    user:
    {
      userName: 'user',
      password: 'password',
      vaultUserName: 'vaultUser',
      vaultPassword: 'vaultPassword'
    },
    elementaryUser: {
      userName: 'elementaryUser',
      password: 'password',
      vaultUserName: 'vaultUser',
      vaultPassword: 'vaultPassword'
    },
    reports: [1, 2, 3],
    elementaryReports: [1, 2]
  },
  {
    id: 102,
    name: 'Company 102',
    authFields: [
      authFieldType.userName,
      authFieldType.password,
      authFieldType.vaultUserName,
      authFieldType.vaultPassword
    ],
    user:
    {
      userName: 'user',
      password: 'password',
      vaultUserName: 'vaultUser',
      vaultPassword: 'vaultPassword'
    },
    elementaryUser: {
      userName: 'elementaryUser',
      password: 'password',
      vaultUserName: 'vaultUser',
      vaultPassword: 'vaultPassword'
    },
    reports: [1, 2],
    elementaryReports: [1]
  },
  {
    id: 103,
    name: 'Company 103',
    authFields: [
      authFieldType.userName,
      authFieldType.password,
      authFieldType.vaultUserName,
      authFieldType.vaultPassword
    ],
    user:
    {
      userName: 'user',
      password: 'password',
      vaultUserName: 'vaultUser',
      vaultPassword: 'vaultPassword'
    },
    reports: [1, 2]
  },
]