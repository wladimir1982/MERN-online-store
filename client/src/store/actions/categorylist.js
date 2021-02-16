import axios from 'axios'
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
} from './actionTypes'

export function getAllCategories() {
  return async dispatch => {
    dispatch(fetchCategoriesStart())
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get('/api/category', {headers: {Authorization: token}})
      const categories = response.data

      dispatch(fetchCategoriesSuccess(categories))
    } catch (e) {
      dispatch(fetchCategoriesError(e))
    }
  }
}

export function fetchCategoriesStart() {
  return {
    type: FETCH_CATEGORIES_START
  }
}

export function fetchCategoriesSuccess(categories) {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    categories
  }
}

export function fetchCategoriesError(e) {
  return {
    type: FETCH_CATEGORIES_ERROR,
    e
  }
}

export function categoryHandler(name, isNew, categoryId, categories) {
  return async dispatch => {
    try {
      const message = `Category "${name}" ${isNew ? 'added' : 'changed'}. 
            Now you can select it from the list.`
      const token = localStorage.getItem('token')

      if (isNew) {
        const response = await axios.post('/api/category', {name: name}, {headers: {Authorization: token}})
        const category = response.data
        categories.push(category)
      } else {
        const response = await axios.patch(`/api/category/${categoryId}`, {name: name}, {headers: {Authorization: token}})
        const category = response.data

        let idx = -1
        categories.find((c, i) => {
          if (c._id === category._id) {
            idx = i
            return true
          }
          return false
        })
        if (idx > -1) categories.splice(idx, 1, category)
        dispatch(addNewCategory())
      }

      dispatch(categoryHandlerSuccess(categories, message))
      dispatch(openMessage())
      setTimeout(() => dispatch(closeMessage()), 3000)

    } catch (e) {
      const message = e.response.data.message
      dispatch(categoryHandlerError(e, message))
      dispatch(addNewCategory())
      dispatch(openMessage())
      setTimeout(() => dispatch(closeMessage()), 3000)
    }
  }
}

export function categoryHandlerSuccess(categories, message) {
  return {
    type: CATEGORY_SUCCESS,
    categories,
    message
  }
}

export function addNewCategory() {
  return {
    type: ADD_NEW_CATEGORY
  }
}

export function changeCategory() {
  return {
    type: CHANGE_CATEGORY
  }
}

export function categoryHandlerError(e, message) {
  return {
    type: CATEGORY_ERROR,
    error: e,
    message
  }
}

export function deleteCategoryHandler(categories, category) {
  return async dispatch => {
    const decision = window.confirm(`Are you sure you want to delete the category "${category.name}"?`)
    const token = localStorage.getItem('token')

    try {
      if (decision) {
        const response = await axios.delete(`/api/category/${category._id}`, {headers: {Authorization: token}})
        const message = response.data.message
        let idx = -1

        categories.find((c, i) => {
          if (c._id === category._id) {
            idx = i
            return true
          }
          return false
        })
        if (idx > -1) categories.splice(idx, 1)
        dispatch(deleteCategorySuccess(categories, message))
        dispatch(openMessage())
        setTimeout(() => dispatch(closeMessage()), 3000)
      }
    } catch (e) {
      const message = e.message
      dispatch(deleteCategoryError(e, message))
      dispatch(openMessage())
      setTimeout(() => dispatch(closeMessage()), 3000)
    }
  }
}

export function deleteCategorySuccess(categories, message) {
  return {
    type: DELETE_CATEGORY_SUCCESS,
    categories,
    message
  }
}

export function deleteCategoryError(e, message) {
  return {
    type: DELETE_CATEGORY_ERROR,
    error: e,
    message
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