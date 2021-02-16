import React from 'react'
import {Content, Title} from './style'


const Footer = () => {
  return (
    <Content>
      <Title>
        Online Store {new Date().getFullYear()}
      </Title>
    </Content>
  )
}

export default Footer