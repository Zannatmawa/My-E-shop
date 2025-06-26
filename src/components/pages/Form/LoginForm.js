import { Formik } from 'formik'
import { Component } from 'react'
import { auth } from '../../../redux/authActionCreators'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Spinner from '../../Spinner/Spinner'
import { Alert } from 'reactstrap'

const mapStateToProps = (state) => ({
    token: state.token,
    authLoading: state.authLoading,
    authFailedMsg:state.authFailedMsg,
});
const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}
class LoginForm extends Component {
    state = {
        mode: "Sign Up"
    }
    handleSwitch = () => {
        this.setState({
            mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up"
        })
    }
    render() {
          let error = null;
        if(this.props.authFailedMsg !== null){
             error  = <Alert color='danger mt-5'>{this.props.authFailedMsg}</Alert>
        }
        if (this.props.token) {
            return <Navigate to="/" replace />;
        }     
        let form = null;
        if(this.props.authLoading){
            form = <Spinner />
        }else{
            form =  <Formik  initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }} onSubmit={(values) => this.props.auth(values.email, values.password, this.state.mode)}
                        validate={(values) => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = "required*"
                            }
                            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                                errors.email = "invalid email address"
                            }

                            if (!values.password) {
                                errors.password = "required*"
                            }
                            else if (values.password.length < 4) {
                                errors.password = "Must be at least 4 characters"
                            }

                            if (this.state.mode === "Sign Up") {
                                if (!values.confirmPassword) {
                                    errors.confirmPassword = "required*"
                                }
                                else if (values.password !== values.confirmPassword) {
                                    errors.confirmPassword = "password didn't macthed"
                                }
                            }
                            // console.log("Errors:", errors)
                            return errors;
                        }}>
                        {({ values, handleChange, handleSubmit, errors }) => (
                            <div style={{
                                border: '1px solid gray',
                                padding: '16px',
                                borderRadius: "7px"
                            }}>
                                <button style={{ width: '100%' }} className='btn btn-outline-dark mb-3' onClick={this.handleSwitch}>Switch to {this.state.mode === "Sign Up" ? "Login" : "Sign Up"}</button>
                                <form onSubmit={handleSubmit}>
                                    <span style={{ color: 'red' }}>{errors.email}</span>
                                    <input name='email'
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder='Enter email address'
                                        className='form-control' />
                                    <br />
                                    <span style={{ color: 'red' }}>{errors.password}</span>
                                    <input name='password'
                                        value={values.password}
                                        onChange={handleChange}
                                        placeholder='Enter password'
                                        className='form-control' />
                                    <br />
                                    {this.state.mode === "Sign Up" && <div>
                                        <span style={{ color: 'red' }}>{errors.confirmPassword}</span>
                                        <input name='confirmPassword'
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            placeholder='confirm your password'
                                            className='form-control' />
                                        <br />
                                    </div>}
                                    <button type='submit' className='btn btn-outline-dark'>{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                                </form>
                            </div>
                        )}
                    </Formik>
        }
        return (
            <div className='m-5'>        
                <div className='col-md-6 m-auto'>
                   {this.props.authFailedMsg && error}
                   {form}
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
