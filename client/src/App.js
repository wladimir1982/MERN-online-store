import React from 'react'
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {CategoriesPage, LoginPage, RegisterPage, ShowProductsPage} from './pages'
import {Logout} from './conponents'
import {AuthLayout, SiteLayout} from './hoc/layouts'

function App() {
  const isAuthenticated = useSelector(({auth}) => !!auth.token)
  const token = localStorage.getItem('token')

  const authRoutes = (
    <Switch>
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Redirect to="/login"/>
    </Switch>
  )

  const siteRouts = (
    <Switch>
      <Route path="/category/:id" exact component={ShowProductsPage}/>
      <Route exact path="/categorieslist" component={CategoriesPage}/>
      <Route path="/logout" component={Logout}/>
      <Redirect to="/categorieslist"/>
    </Switch>
  )

  return (
    token
      ? <SiteLayout>{siteRouts}</SiteLayout>
      : <AuthLayout>{authRoutes}</AuthLayout>
  )
}

export default withRouter(App)
