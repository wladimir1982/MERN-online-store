import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/es/Button/Button'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import FilterListIcon from '@material-ui/icons/FilterList'
import CircularProgress from '@material-ui/core/es/CircularProgress/CircularProgress'
import Snackbar from '@material-ui/core/es/Snackbar/Snackbar'
import {indigo, lightGreen, lime, pink} from '@material-ui/core/colors'
import Grid from '@material-ui/core/Grid'
import RenderProductItem from './RenderProductItem'
import {addProduct, changeProduct, closeModalProduct, deleteProduct, fetchProducts, openModalProduct} from '../../store/actions/products'
import {AddProductBlock, Container, LoaderWrap, MessageText, ProductList, Row, Title, WrapBtn} from './style'
import {ModalForm, SearchByProducts} from '../../conponents'


const ShowProductsPage = () => {
  const [isFormFilter, setIsFormFilter] = useState(false)
  const [query, setQuery] = useState('')
  const [columnToQuery, setColumnToQuery] = useState('Product name')

  const dispatch = useDispatch()
  const products = useSelector(({products}) => products)
  const category = JSON.parse(localStorage.getItem('category'))
  const productModalRef = useRef()

  useEffect(() => {
    dispatch(fetchProducts())
  },[])

  const onChangeQuery = e => {
    setQuery(e.target.value)
  }

  const onChangeColumnToQuery = e => {
    setColumnToQuery(e.target.value)
    setQuery('')
  }

  const openModalProductHandler = () => {
    dispatch(openModalProduct())
    setIsFormFilter(false)
    setQuery('')
  }

  const closeModalProductHandler = () => {
    dispatch(closeModalProduct())
  }

  const toggleFilter = () => {
    setIsFormFilter(!isFormFilter)
  }

  const onChangeProductHandler = () => {
    dispatch(changeProduct())
  }

  const onDeleteProductHandler = (name, id) => {
    dispatch(deleteProduct(name, id))
  }

  return (
    <Container >
      <AddProductBlock>
        <WrapBtn>
          <Button
            onClick={openModalProductHandler}
            type="submit"
            variant="contained"
            className="button"
            style={{background: indigo.A700, color: lime["50"], cursor: 'pointer'}}
          >
            Add product
          </Button>
          {
            !products.loading && products.products.length >= 2
              ? <IconButton
                onClick={toggleFilter}
                style={{
                  marginLeft: 10,
                  color: isFormFilter ? lightGreen.A400 : pink["400"]
                }}
                className="button"
                aria-label="FilterListIcon"
              >
                <FilterListIcon style={{fontSize: 35}}/>
              </IconButton>
              : null
          }
        </WrapBtn>
        <ModalForm
          open={products.isOpenModal}
          isNewProduct={products.isNewProduct}
          products={products.products}
          changeIsNewProduct={addProduct}
          handleClose={closeModalProductHandler}
          ref={productModalRef}
        />
      </AddProductBlock>
      <Row>
        <div>
          <Title>
            List of products by category "{category.name}"
          </Title>
          {
            products.products.length >= 2 && isFormFilter
              ? <SearchByProducts
                query={query}
                columnToQuery={columnToQuery}
                onChangeQuery={onChangeQuery}
                onChangeColumnToQuery={onChangeColumnToQuery}
              />
              : null
          }
          {
            !products.loading
              ? <Row>
                {
                  products.products.length !== 0
                    ? <ProductList>
                      <Grid container spacing={2}>
                        <RenderProductItem
                          query={query}
                          columnToQuery={columnToQuery}
                          products={products}
                          openModalProduct={openModalProductHandler}
                          changeProduct={onChangeProductHandler}
                          deleteProduct={onDeleteProductHandler}
                          productModalRef={productModalRef}
                        />
                      </Grid>
                    </ProductList>
                    : <MessageText>
                      Your list of products in category "{category.name}" is empty yet. To create a list - click on the "ADD PRODUCT" button and create your collection ...
                    </MessageText>
                }
              </Row>
              : <LoaderWrap>
                <CircularProgress className="progress"/>
              </LoaderWrap>
          }
        </div>
      </Row>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={products.isOpenMessage}
        ContentProps={{'aria-describedby': 'message-id'}}
        message={<span id="message-id">{products.message}</span>}
      />
    </Container>
  )
}

export default ShowProductsPage