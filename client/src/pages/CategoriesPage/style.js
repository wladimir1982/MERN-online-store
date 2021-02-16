import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'

export const Container = styled(Grid)`
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: radial-gradient(ellipse farthest-side at 100% 100%,#97c9d5 5%,#1b5494 60%,#1f2e5a 120%);
`
export const CategoryList = styled.ul`
  margin-bottom: 50px;
`
export const CategoryListItem = styled.li`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  background: #00b3b3;
  border-bottom: 2px solid #262626;
  border-radius: 5px;
`
export const GenreTitleBtn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 80px;
`
export const GenreTitle = styled.h1`
  color: #f9fbe7;
`
export const InfoDescription = styled.p`
  font-size: 18px;
  color: #f9fbe7;
`
export const Wrap = styled.div`
  padding: 24px;
  margin: 30px 0;
  border-radius: 5px;
  background-color: #bdbdbd;
`
export const AddCategoryBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
export const List = styled.div`
  box-sizing: border-box;
  overflow-y: scroll;
  height: 200px;
  margin-bottom: 20px;
  padding: 10px 2px 10px 10px;
  border-radius: 10px;
  background-color: #bdbdbd;
`
export const ListDescription = styled.p`
  font-size: 18px;
  color: #f9fbe7;
  padding-top: 20px;
`
export const WrapLoader = styled.div`
  display: flex;
  justify-content:center;
`
export const ErrorBlock = styled.div`
  height: 20px;
`