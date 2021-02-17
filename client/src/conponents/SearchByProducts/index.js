import React from 'react'
import {Grid, TextField} from '@material-ui/core'
import {Form, WrapForm} from './style'


const SearchByProducts = ({query, onChangeQuery, columnToQuery, onChangeColumnToQuery}) => {

  const data = [
    {value: 'Product name', id: 1},
    {value: 'Price', id: 2},
    {value: 'Description product', id: 3}
  ]

  return (
    <WrapForm>
      <Form onSubmit={e => e.preventDefault()}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="columnToQuery"
              id="standard-select-currency-native"
              select
              label="Filter by:"
              className="textField"
              value={columnToQuery}
              onChange={onChangeColumnToQuery}
              SelectProps={{
                native: true,
                MenuProps: {className: 'menu'}
              }}
              style={{width: '100%', height: '2.87em'}}
            >
              {data.map(option => (
                <option key={option.id} value={option.value}>
                  {option.value}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="query"
              id="standard-dense"
              label={columnToQuery}
              className="textField dense"
              value={query}
              onChange={onChangeQuery}
              style={{width: '100%', height: '2.87em'}}
            />
          </Grid>
        </Grid>
      </Form>
    </WrapForm>
  )
}

export default SearchByProducts
