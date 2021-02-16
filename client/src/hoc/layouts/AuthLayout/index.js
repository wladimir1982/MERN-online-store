import React, {useState} from 'react'

import {AuthLayoutBlock, Container} from './style'
import {Header} from '../../../conponents'

const AuthLayout = ({children}) => {
  const [isAuth, setIsAuth] = useState(true)

  return (
    <Container>
      <Header isAuth={isAuth}/>
      <AuthLayoutBlock>
        {children}
      </AuthLayoutBlock>
    </Container>
  )
}

export default AuthLayout;