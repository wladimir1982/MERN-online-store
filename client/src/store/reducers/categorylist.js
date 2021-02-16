import {
  ADD_NEW_CATEGORY,
  CHANGE_CATEGORY,
  CLOSE_MESSAGE,
  DELETE_CATEGORY_ERROR,
  DELETE_CATEGORY_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_START,
  FETCH_CATEGORIES_SUCCESS,
  CATEGORY_ERROR,
  CATEGORY_SUCCESS,
  OPEN_MESSAGE
} from '../actions/actionTypes'


const initialState = {
  isInitial: true,
  isNew: true,
  loading: false,
  isOpenMessage: false,
  categories: [],
  message: ''
}


export default function categoryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_START:
      return {
        ...state, loading: true
      }
    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state, loading: false, categories: action.categories
      }
    case FETCH_CATEGORIES_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    case CATEGORY_SUCCESS:
      return {
        ...state, categories: action.categories, message: action.message
      }
    case CATEGORY_ERROR:
      return {
        ...state, error: action.error, message: action.message
      }
    case ADD_NEW_CATEGORY:
      return {
        ...state, isNew: true
      }
    case CHANGE_CATEGORY:
      return {
        ...state, isNew: false
      }
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state, categories: action.categories, message: action.message
      }
    case DELETE_CATEGORY_ERROR:
      return {
        ...state, error: action.error, message: action.message
      }
    case OPEN_MESSAGE:
      return {
        ...state, isOpenMessage: true
      }
    case CLOSE_MESSAGE:
      return {
        ...state, isOpenMessage: false
      }
    default:
      return state
  }
}