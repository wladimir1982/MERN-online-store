import React from 'react'
import {lightGreen, pink} from '@material-ui/core/colors'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'

import {
  FilterEmptyText, ProductDescription, ProductImage, ProductItem,
  ProductPopups, ProductPrice, ProductTitle, WrapProductIconBtn
} from './style'


const RenderProductItem = ({query, columnToQuery, products, openModalProduct, changeProduct, deleteProduct, productModalRef}) => {
  let productsSort = products.products.sort((a, b) => a.name.localeCompare(b.name))
  const lowerCaseQuery = query.toLowerCase()

  if (columnToQuery === 'Product name') {
    if (query) {
      productsSort = products.products.filter(x => x.name.toLowerCase().includes(lowerCaseQuery) ? true : null)
    }
  } else if (columnToQuery === 'Description product') {
    if (query) {
      productsSort = products.products.filter(x => x.description.toLowerCase().includes(lowerCaseQuery) ? true : null)
    }
  } else if (columnToQuery === 'Price') {
    if (query) {
      productsSort = products.products.filter(x => x.price.toString().toLowerCase().includes(query.toString().toLowerCase()) ? true : null)
    }
  } else {
    productsSort = products.products.sort((a, b) => a.name.localeCompare(b.name))
  }

  const editProduct =(product) => {
    openModalProduct()
    changeProduct()
    productModalRef.current.updateProduct(product)
  }


  if (productsSort.length) {
    return productsSort.map(product => (
        <Grid key={product._id} item xs={12} sm={4} md={3}>
          <ProductItem>
            <ProductPopups>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductPrice>Price: {product.price} $</ProductPrice>
              <ProductDescription>{product.description}</ProductDescription>
              <WrapProductIconBtn>
                <IconButton
                  onClick={editProduct}
                  style={{color: lightGreen.A400}}
                  className="button"
                  aria-label="Edit"
                >
                  <EditIcon/>
                </IconButton>
                <IconButton
                  onClick={() => deleteProduct(product.name, product._id)}
                  style={{color: pink["400"]}}
                  className="button"
                  aria-label="Delete"
                >
                  <DeleteIcon/>
                </IconButton>
              </WrapProductIconBtn>
            </ProductPopups>
            <ProductImage
              src={`../../../../${product.imageSrc}`}
              // src={`https://res.cloudinary.com/dmbjlzkjb/image/upload/v1551823423/${product.public_id}`}
              alt={product.name}
            />
          </ProductItem>
        </Grid>
      ))
  } else {
    return (
      <FilterEmptyText>
        Sorry... We don't have a product matching your search criteria...
      </FilterEmptyText>
    )
  }
}

export default RenderProductItem