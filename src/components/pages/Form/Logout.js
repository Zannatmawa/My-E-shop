import React, { Component } from 'react'
import { connect } from 'react-redux'
import { authLogout } from '../../../redux/authActionCreators'
import { Navigate } from 'react-router-dom'
const mapDispatchToProps = dispatch =>{
    return{
        authLogout: ()=> dispatch(authLogout())
    }
}
class Logout extends Component {
    componentDidMount(){
        this.props.authLogout()
    }
  render() {
    return (
      <Navigate to="/" />
    )
  }
}
export default  connect (null,mapDispatchToProps)(Logout)