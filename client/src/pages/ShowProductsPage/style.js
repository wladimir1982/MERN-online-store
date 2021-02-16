import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

export const Container = styled(Grid).attrs(() => ({
  container: true,
  direction: 'column'
}))`
  min-height: 100vh;
  height: 100%;
  background: radial-gradient(ellipse farthest-side at 100% 100%,#ffb29b 10%,#e56699 30%,#341e7e 109%);
  padding: 0 30px;
`
export const AddProductBlock = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 30px;
`
export const WrapBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`
export const Row = styled.div`
`
export const Title = styled.h1`
  margin-bottom: 30px;
  text-align: center;
  color: #f9fbe7;
  font-weight: bold;
`
export const ProductList = styled.ul`
  margin-bottom: 50px;
`
export const ProductItem = styled.li`
  position: relative;
  transition: 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
}
`
export const ProductPopups = styled.div`
  height: 330px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  background-color: rgba(0,0,0,0.8);
  padding: 10px;
  display: block;
  opacity: 0;
  transition: all ease 0.5s;
  &:hover {
    opacity: 1;
}
`
export const ProductTitle = styled.h2`
  color: #ef6c00;
  text-align: left;
  font-size: 18px;
  height: 100px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
`
export const ProductPrice = styled.p`
  color: #ef6c00;
  margin-bottom: 20px;
`
export const ProductDescription = styled.p`
  color: #ef6c00;
  font-size: 12px;
  font-weight: 400;
  overflow-y: auto;
  width: 95%;
  height: 100px;
`
export const WrapProductIconBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
export const ProductImage = styled.img`
  width: 100%;
  height: 330px;
  border-radius: 10px;
`
export const MessageText = styled.p`
  padding-top: 20px;
  color: #f9fbe7;
  font-size: 18px;
`
export const LoaderWrap = styled.div`
  display: flex;
  justify-content:center;
`