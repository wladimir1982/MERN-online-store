import {combineReducers} from 'redux'
import authReducer from './auth'
import categoryReducer from './categorylist'
import productReducer from './products'

export default combineReducers({
  auth: authReducer,
  categories: categoryReducer,
  products: productReducer,
})