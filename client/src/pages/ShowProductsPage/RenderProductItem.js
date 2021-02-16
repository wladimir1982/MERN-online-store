import React from 'react'
import {lightGreen, lime, pink} from '@material-ui/core/colors/index'
import IconButton from '@material-ui/core/es/IconButton/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import Grid from '@material-ui/core/Grid'
import {
  ProductDescription,
  ProductImage,
  ProductItem,
  ProductPopups,
  ProductPrice,
  ProductTitle,
  WrapProductIconBtn
} from "./style";


const RenderProductItem = ({query, columnToQuery, products, openModalProduct, changeProduct, deleteProduct, clickChangeProduct, productModalRef}) => {
  console.log('products @@@@@@@: ', products.products)
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
      productsSort = products.products.filter(x => x.year.toString().toLowerCase().includes(query.toString().toLowerCase()) ? true : null)
    }
  } else {
    productsSort = products.products.sort((a, b) => a.name.localeCompare(b.name))
  }


  if (productsSort.length) {
    return productsSort.map(product => {
      return (
        <Grid key={product._id} item xs={12} sm={4} md={3}>
          <ProductItem>
            <ProductPopups>
              <ProductTitle>{product.name}</ProductTitle>
              <ProductPrice>Price: {product.price} $</ProductPrice>
              <ProductDescription>{product.description}</ProductDescription>
              <WrapProductIconBtn>
                <IconButton
                  onClick={() => {
                    console.log('AAAAAAAAAAA')
                    openModalProduct()
                    changeProduct()
                    // clickChangeProduct(product)
                    productModalRef.current.updateProduct(product)
                  }}
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
            {/*<img className="film-img" src={`../../../../${film.imageSrc}`} alt={film.name}/>*/}
            <ProductImage
              src={`../../../../${product.imageSrc}`}
              // src={`https://res.cloudinary.com/dmbjlzkjb/image/upload/v1551823423/${product.public_id}`}
              alt={product.name}
            />
          </ProductItem>
        </Grid>
      )
    })
  } else {
    return (
      <p style={{fontWeight: 400, fontSize: 18, color: lime["50"]}}>
        Извините... Фильма соответствующего критериям Вашего поиска у нас нет...
      </p>
    )
  }
}

export default RenderProductItem