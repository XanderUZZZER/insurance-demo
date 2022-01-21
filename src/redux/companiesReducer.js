import { LOGIN } from './actionTypes'
import { companiesData } from '../data/companies'


const initialState = companiesData

export const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state
      }
    default:
      return state
  }
}
