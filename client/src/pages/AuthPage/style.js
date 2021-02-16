import styled from 'styled-components'

export const AuthLayout = styled.div`
  min-height: 100vh;
  height: 100%;
  background: linear-gradient(270deg, #28a745 0%, #20c997 100%);
`
export const AuthBlock = styled.main`
  display: flex;
  padding-top: 120px;
  justify-content: center;
  align-items: center;
`
export const Form = styled.form`
  width: 400px;
  position: relative;
  margin: .5rem 0 1rem 0;
  background: #eee;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);
  border-radius: 10px;
`
export const CardContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
`
export const CardTitle = styled.h1`
  font-size: 30px;
  text-align: center;
  color: #303f9f;
`
export const Input = styled.input` 
  height: 40px;
  padding: 0 10px;
  border: solid 2px #303f9f;
  border-radius: 5px;
`
export const Label = styled.label`
  color: #303f9f;
`
export const ErrorBlock = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
`
export const Error = styled.p`
  margin: 0;  
  color: #d81a1a;
`

export const CardAction = styled.div`
 border-top: 2px solid rgba(160,160,160,0.2);
 position: relative;
 padding: 16px 24px;
`

export const TextBtn = styled.p`
  color: #fff;
`