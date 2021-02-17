import axios from 'axios'
import {
  ADD_PRODUCT,
  CHANGE_PRODUCT,
  CLOSE_MESSAGE,
  CLOSE_MODAL_PRODUCT,
  DELETE_PRODUCT_ERROR,
  DELETE_PRODUCT_SUCCESS,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_START,
  FETCH_PRODUCT_SUCCESS,
  OPEN_MESSAGE,
  OPEN_MODAL_PRODUCT,
  FETCH_PRODUCT_ERROR,
} from './actionTypes'

export function fetchProducts() {
  return async dispatch => {
    const token = localStorage.getItem('token')
    const categoryId = window.location.pathname.split('/')[2]

    try {
      dispatch(fetchProductsStart())
      const response = await axios.get(`/api/product/${categoryId}`, {headers: {Authorization: token}})
      const products = response.data
      dispatch(fetchProductsSuccess(products))
    } catch (e) {
      dispatch(fetchProductsError(e))
    }
  }
}

export function fetchProductsStart() {
  return {
    type: FETCH_PRODUCTS_START
  }
}

export function fetchProductsSuccess(products) {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    products
  }
}

export function fetchProductsError(e) {
  return {
    type: FETCH_PRODUCTS_ERROR,
    error: e
  }
}

export function productHandler(dataModalForm) {
  return async dispatch => {
    const {
      isNewProduct, handleClose, products, name, price,
      description, selectedFile, selectedFileName, productId, categoryId
    } = dataModalForm
    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dmbjlzkjb/upload'
    const CLOUDINARY_UPLOAD_PRESET = 'mr8htuhv'

    try {
      const token = localStorage.getItem('token')
      let message = ''
      let formDataCloudinary = new FormData()

      formDataCloudinary.append('file', selectedFile, selectedFileName)
      formDataCloudinary.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      const responseCloudinary = await axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formDataCloudinary
      })
      const cloudinaryId = responseCloudinary.data.public_id

      let formData = new FormData()
      formData.append('category', categoryId)
      formData.append('name', name)
      formData.append('price', price)
      formData.append('description', description)
      formData.append('image', selectedFile, selectedFileName)
      formData.append('public_id', cloudinaryId)

      if (isNewProduct) {
        const response = await axios.post('/api/product', formData, {headers: {Authorization: token}})
        const product = response.data

        message = `Product "${name}" added successfully.`

        products.push(product)
      } else {
        const response = await axios.patch(`/api/product/${productId}`, formData, {headers: {Authorization: token}})
        message = `Product "${name}" edited successfully.`
        const product = response.data
        let idx = -1

        products.find((f, i) => {
          if (f._id === product._id) {
            idx = i
            return true
          }
          return false
        })
        if (idx > -1) products.splice(idx, 1, product)
      }

      dispatch(productHandlerSuccess(message))
      dispatch(openMessage())
      setTimeout(() => {
        dispatch(closeMessage())
        if (!isNewProduct) handleClose()
      }, 3000)
    } catch (e) {
      const message = e.message
      dispatch(productHandlerError(e, message))
      dispatch(openMessage())
      setTimeout(() => {
        dispatch(closeMessage())
      }, 3000)
    }
  }
}

export function productHandlerSuccess(message) {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    message
  }
}

export function productHandlerError(e, message) {
  return {
    type: FETCH_PRODUCT_ERROR,
    error: e,
    message
  }
}

export function deleteProduct(name, id) {
  return async dispatch => {
    const decision = window.confirm(`Are you sure you want to delete the product "${name}"`)
    const token = localStorage.getItem('token')
    const categoryId = window.location.pathname.split('/')[2]

    try {
      if (decision) {
        const response = await axios.delete(`/api/product/${id}`, {headers: {Authorization: token}})
        const message = response.data.message
        const responseProducts = await axios.get(`/api/product/${categoryId}`, {headers: {Authorization: token}})
        const products = responseProducts.data
        dispatch(deleteProductSuccess(products, message))
        dispatch(openMessage())
        setTimeout(() => dispatch(closeMessage()), 3000)
      }
    } catch (e) {
      const message = e.response.data.message
      dispatch(deleteProductError(e, message))
      dispatch(openMessage())
      setTimeout(() => dispatch(closeMessage()), 3000)
    }
  }
}

export function deleteProductSuccess(products, message) {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    products,
    message
  }
}

export function deleteProductError(e, message) {
  return {
    type: DELETE_PRODUCT_ERROR,
    error: e,
    message
  }
}

export function openModalProduct() {
  return {
    type: OPEN_MODAL_PRODUCT
  }
}

export function closeModalProduct() {
  return {
    type: CLOSE_MODAL_PRODUCT
  }
}

export function openMessage() {
  return {
    type: OPEN_MESSAGE
  }
}

export function closeMessage() {
  return {
    type: CLOSE_MESSAGE
  }
}

export function addProduct() {
  return {
    type: ADD_PRODUCT
  }
}

export function changeProduct() {
  return {
    type: CHANGE_PRODUCT
  }
}