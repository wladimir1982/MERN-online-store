import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import {indigo, lime} from '@material-ui/core/colors'

import {auth} from '../../store/actions/auth'
import {
  AuthBlock, AuthLayout, CardAction, CardContent,
  CardTitle, Error, ErrorBlock, Form, Input, Label, TextBtn
} from './style'

const RegisterPage = () => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const {register, handleSubmit, errors} = useForm()

  const onSubmit = data => {
    dispatch(auth(data.email, data.password, false))
      .then(() => {
        history.push({
          pathname: '/login',
          search: 'registered'
        })
      })
      .catch((e) => {
      const message = e.response.data.message
      setOpen(true)
      setMessage(message)
      setTimeout(() => setOpen(false), 3000)
    })
  }

  return (
    <Grid>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <CardTitle>Sign In</CardTitle>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            ref={register({required: "Email is required"})}
          />
          <ErrorBlock>
            {errors.email && <Error>{errors.email.message}</Error>}
          </ErrorBlock>
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            ref={register({
              required: "Password is required",
              minLength: {
                value: 6,
                message: "must be min 6 chars"
              }
            })}
          />
          <ErrorBlock>
            {errors.password && <Error>{errors.password.message}</Error>}
          </ErrorBlock>
        </CardContent>
        <CardAction>
          <Button
            type="submit"
            variant="contained"
            style={open
              ? {cursor: 'not-allowed', pointerEvents: 'auto'}
              : {background: indigo.A700, color: lime["50"], cursor: 'pointer'}}
            disabled={open}
          >
            <TextBtn>Sign In</TextBtn>
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id" style={{color: '#fff'}}>{message}</span>}
          />
        </CardAction>
      </Form>
    </Grid>
  )
}

export default RegisterPage