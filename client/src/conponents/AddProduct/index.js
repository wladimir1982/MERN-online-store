import React, {forwardRef, useImperativeHandle, useState} from 'react'
import {useDispatch} from 'react-redux'
import {Controller, useForm} from 'react-hook-form'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import {grey, indigo, lime} from '@material-ui/core/colors/index'
import Slide from '@material-ui/core/Slide'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {productHandler} from '../../store/actions/products'
import {Error, ErrorBlock} from '../../pages/AuthPage/style'
import {Form, InputWrap, TitleForm} from './style'

const Transition = props => {
  return <Slide direction="up" {...props} />
}

const defaultValues = {
  name: "",
  description: "",
  price: "",
  file: "",
}

const ModalForm = forwardRef(({open, isNewProduct, products, changeIsNewProduct, handleClose}, ref) => {
  const [productId, setProductId] = useState('')
  const [fileError, setFileError] = useState('')
  const [selectedFile, setSelectedFile] = useState(null)
  const dispatch = useDispatch()

  const {formState, handleSubmit, register, reset, control, errors} = useForm({
    defaultValues,
    mode: "all"
  })
  const { isDirty, isValid } = formState

  useImperativeHandle(ref, () => ({
    updateProduct(product) {
      console.log('product @@@@@@@@@@@: ', product)
      const productId = product._id
      defaultValues.name = product.name
      defaultValues.description = product.description
      defaultValues.price = product.price
      console.log('defaultValues @@@@@@@@@@@: ', defaultValues)

      setProductId(productId)
    }
  }))

  const onSubmit = data => {
    if(!fileError) {
      const categoryId = window.location.pathname.split('/')[2]
      const dataModalForm = {
        isNewProduct,
        handleClose,
        products,
        name: data.name,
        price: data.price,
        description: data.description,
        selectedFile: data.file[0],
        selectedFileName: data.file[0].name,
        productId,
        categoryId
      }
      dispatch(productHandler(dataModalForm))
      reset()
    }
  }

  const resetForm = () => {
    reset()
    handleClose()
  }

   const onChangeFile = (event) => {
     const {value} = event.target
     const ext = value.substring(value.lastIndexOf('.') + 1)
     if (event.target.files && event.target.files[0]) {
       console.log('event.target.files[0] @@@@: ', event.target.files[0])
       const errorMessage =
         (ext.toLowerCase() === 'jpeg' || ext.toLowerCase() === 'jpg' || ext.toLowerCase() === 'png'
           ? '' : 'Picture must be in jpeg, jpg, png format') ||
         (event.target.files[0].size > 5242880 ? 'Size should not exceed 5 MB' : '') ||
         (event.target.files[0].size < 70 * 70 ? 'Size must not be less than 70 * 70' : '')
       setFileError(errorMessage)
       if(!errorMessage) setSelectedFile(event.target.files[0])
       console.log('errorMessage @@@@: ', errorMessage, !!errorMessage)
     }

   }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogContent style={{background: grey['400']}}>
        <Button
          onClick={resetForm}
          variant="contained"
          color="secondary"
          startIcon={<CloseIcon />}
          style={{position: 'absolute', top: 20, left: 20}}
        >
          Close
        </Button>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TitleForm>{isNewProduct ? 'Add product' : 'Change product'}</TitleForm>
          <InputWrap>
            <Controller
              as={
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="text"
                  style={{width: 300}}
                  label="Product name"
                  margin="dense"
                />
              }
              name="name"
              control={control}
              rules={{
                required: {value: true, message: 'Name field is required'},
                minLength: {value: 2, message: 'Minimum length 2 characters'},
                maxLength: {value: 100, message: 'Maximum length 100 characters'},
              }}
            />
            <ErrorBlock>
              {errors.name && <Error>{errors.name.message}</Error>}
            </ErrorBlock>
          </InputWrap>
          <InputWrap>
            <Controller
              as={
                <TextField
                  id="standard-multiline-static"
                  variant="outlined"
                  label="Product description"
                  multiline
                  rows="4"
                  style={{width: 300}}
                  margin="normal"
                />
              }
              name="description"
              control={control}
              rules={{
                required: {value: true, message: 'Description field is required'},
                minLength: {value: 10, message: 'Minimum length 10 characters'},
                maxLength: {value: 300, message: 'Maximum length 300 characters'},
              }}
            />
            <ErrorBlock>
              {errors.description && <Error>{errors.description.message}</Error>}
            </ErrorBlock>
          </InputWrap>
          <InputWrap>
            <Controller
              as={
                <TextField
                  variant="outlined"
                  id="standard-dense"
                  label="Price"
                  style={{width: 300}}
                  margin="dense"
                />
              }
              name="price"
              control={control}
              rules={{
                required: {value: true, message: 'Price field is required'},
                pattern: {value: /^\d*(\.\d{2})?$/, message: 'Available input formats: 12.33 or 1.56'},
              }}
            />
            <ErrorBlock>
              {errors.price && <Error>{errors.price.message}</Error>}
            </ErrorBlock>
          </InputWrap>
          <InputWrap>
            <input
              name="file"
              style={{ display: "none" }}
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={onChangeFile}
              ref={register({
                required: {
                  value: true,
                  message: 'File field is required',
                },
              })}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                color="primary"
                component="span"
                style={{width: 300}}
                startIcon={<CloudUploadIcon />}
              >
                Upload picture
              </Button>
            </label>
            <ErrorBlock>
              {errors.file && <Error>{errors.file.message}</Error>}
              {fileError && <Error>{fileError}</Error>}
            </ErrorBlock>
          </InputWrap>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            style={isDirty && isValid && !fileError
              ? {background: indigo.A700, color: lime["50"], cursor: 'pointer'}
              : {cursor: 'not-allowed', pointerEvents: 'auto'}}
          >
            {isNewProduct ? 'Add' : 'Change'}
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={products.isOpenMessage}
            ContentProps={{'aria-describedby': 'message-id'}}
            // message={<span id="message-id">{message}</span>}
          />
        </Form>
      </DialogContent>
    </Dialog>
  )
})

export default ModalForm