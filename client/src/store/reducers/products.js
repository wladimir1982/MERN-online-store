import {
  ADD_PRODUCT,
  CHANGE_PRODUCT,
  CLOSE_MESSAGE,
  CLOSE_MODAL_PRODUCT,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCTS_SUCCESS,
  OPEN_MESSAGE,
  OPEN_MODAL_PRODUCT
} from '../actions/actionTypes'

const initialState = {
  loading: false,
  isNewProduct: true,
  isOpenMessage: false,
  isOpenModal: false,
  products: [],
  error: null,
  message: ''
}

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS_START:
      return {
        ...state, loading: true
      }
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state, loading: false, products: action.products
      }
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state, loading: false, error: action.error
      }
    case FETCH_PRODUCT_SUCCESS:
      return {
        ...state, message: action.message
      }
    case FETCH_PRODUCT_ERROR:
      return {
        ...state, error: action.error, message: action.message
      }
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state, loading: false, products: action.products, message: action.message
      }
    case DELETE_PRODUCT_ERROR:
      return {
        ...state, loading: false, error: action.error, message: action.message
      }
    case OPEN_MODAL_PRODUCT:
      return {
        ...state, isOpenModal: true
      }
    case CLOSE_MODAL_PRODUCT:
      return {
        ...state, isOpenModal: false
      }
    case OPEN_MESSAGE:
      return {
        ...state, isOpenMessage: true
      }
    case CLOSE_MESSAGE:
      return {
        ...state, isOpenMessage: false
      }
    case ADD_PRODUCT:
      return {
        ...state, isNewProduct: true
      }
    case CHANGE_PRODUCT:
      return {
        ...state, isNewProduct: false
      }
    default:
      return state
  }
}