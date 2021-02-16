import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {logout} from '../../store/actions/auth'

const Logout = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(logout())
  },[])

  return (
    <Redirect to={'/'} />
  )
}

export default Logout


/*
class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return <Redirect to={'/'} />
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(Logout)*/
