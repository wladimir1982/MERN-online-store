import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {TextField, Fab} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import {deepOrange, indigo, lightGreen, lime, pink} from '@material-ui/core/colors'
import Snackbar from '@material-ui/core/es/Snackbar/Snackbar'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress'
import Grid from '@material-ui/core/Grid'

import {
  getAllCategories,
  deleteCategoryHandler,
  categoryHandler,
  changeCategory
} from '../../store/actions/categorylist'
import {
  AddCategoryBlock, CategoryList, CategoryListItem, Container, ErrorBlock, GenreTitle,
  GenreTitleBtn, InfoDescription, List, ListDescription, Wrap, WrapLoader
} from './style'

const CategoriesPage = () => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [isInfo, setIsInfo] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [errorMessage, setErrorMessage] = useState({category: ''})

  const dispatch = useDispatch()
  const categories = useSelector(({categories}) => categories)

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  const onChangeCategory = (name, id) => {
    dispatch(changeCategory())
    setIsFormValid(true)
    setCategoryName(name)
    setCategoryId(id)
  }

  const onCategoryHandler = () => {
    setIsFormValid(false)
    dispatch(categoryHandler(categoryName, categories.isNew, categoryId, categories.categories))
    setCategoryName('')
  }

  const submitHandler = event => {
    event.preventDefault()
  }

  const setCategoryToLocalStorage = (category) => {
    localStorage.setItem('category', JSON.stringify(category))
  }

  const toggleInfoBlock = () => {
    setIsInfo(!isInfo)
  }

  const onChangeHandler = event => {
    const {name, value} = event.target

    switch (name) {
      case 'categoryName':
        errorMessage.category = (value.length > 30 ? 'Category name must be up to 30 characters' : '') ||
          (value.trim().length < 2 ? 'Category name must be min 2 characters' : '')
        break
      default:
        break
    }

    let isFormValid = true

    Object.keys(errorMessage).forEach(name => {
      isFormValid = errorMessage[name].length > 0 ? !isFormValid : isFormValid
    })

    setErrorMessage(errorMessage)
    setCategoryName(value)
    setIsFormValid(isFormValid)
  }

  const deleteCategory = (categories, category) => {
    dispatch(deleteCategoryHandler(categories, category))
  }

  const renderCategoryList = () => {
    const categoriesList = categories.categories.sort((a, b) => a.name.localeCompare(b.name))

    return (
      <CategoryList>
        {categoriesList.map(category => (
          <CategoryListItem
            key={category._id}
          >
            <NavLink
              onClick={() => setCategoryToLocalStorage(category)}
              to={`/category/${category._id}`}
              style={{
                width: '100%',
                textDecoration: 'none'
              }}
            >
              <p className="genre-name">{category.name}</p>
            </NavLink>
            <IconButton
              onClick={() => onChangeCategory(category.name, category._id)}
              style={{color: deepOrange['900']}}
              className="button"
              aria-label="Edit"
            >
              <EditIcon/>
            </IconButton>
            <IconButton
              onClick={() => deleteCategory(categoriesList, category)}
              style={{color: pink["400"]}}
              className="button"
              aria-label="Delete"
            >
              <DeleteIcon/>
            </IconButton>
          </CategoryListItem>
        ))}
      </CategoryList>
    )
  }

  return (
    <Container
      container
      direction="column"
      style={{padding: '0 15px'}}
    >
      <GenreTitleBtn>
        <GenreTitle>
          Add a new category or choose from the list
        </GenreTitle>
        {!categories.categories.length &&
        <IconButton
          onClick={toggleInfoBlock}
          style={{
            marginLeft: 10,
            color: isInfo ? lightGreen.A400 : pink["400"]
          }}
          className="button"
          aria-label="Info"
        >
          <InfoIcon style={{fontSize: 35}}/>
        </IconButton>}
      </GenreTitleBtn>
      {
        isInfo
          ? <InfoDescription>
            1. To get started with the application, use the form to add categories <br/>
            2. Add categories as needed <br/>
            3. Categories from the list, at your discretion, can be edited or deleted <br/>
            4. Go to the desired category and create your own collection of products in it
          </InfoDescription>
          : null
      }
      <Grid item xs={12} style={{width: 400}}>
        <Wrap>
          <form onSubmit={submitHandler} noValidate>
            <AddCategoryBlock>
              <TextField
                error={errorMessage.category.length > 0 ? !!1 : !!0}
                name="categoryName"
                value={categoryName}
                id="standard-dense"
                label={categories.isNew
                  ? 'Add category'
                  : 'Change category'}
                className="textField dense"
                margin="dense"
                noValidate
                onChange={onChangeHandler}
              />
              <Fab
                onClick={onCategoryHandler}
                type="submit"
                size="small"
                aria-label="Add"
                className="margin"
                style={isFormValid
                  ? {background: indigo.A700, color: lime["50"], cursor: 'pointer', borderRadius: '50%'}
                  : {cursor: 'not-allowed', pointerEvents: 'auto', borderRadius: '50%'}}
                disabled={!isFormValid}
              >
                {
                  categories.isNew
                    ? <AddIcon/>
                    : <EditIcon/>
                }
              </Fab>
            </AddCategoryBlock>
            <ErrorBlock>
              {errorMessage.category.length > 0 && (
                <span className="error-message" style={{color: 'red'}}>{errorMessage.category}</span>
              )}
            </ErrorBlock>
          </form>
        </Wrap>
      </Grid>
      {
        !categories.loading
          ? <Grid item xs={12} style={{width: 400}}>
            {
              categories.categories.length !== 0
                ? <List>
                  {renderCategoryList()}
                </List>
                : <ListDescription>
                  Your category list is empty yet. You can create your list of categories using the form above
                </ListDescription>
            }
          </Grid>
          : <WrapLoader>
            <CircularProgress className="progress"/>
          </WrapLoader>
      }
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={categories.isOpenMessage}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id" style={{color: '#fff'}}>{categories.message}</span>}
      />
    </Container>
  )
}

export default CategoriesPage