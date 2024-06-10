import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import { Submit } from '../layout/Submit'
import { motion } from 'framer-motion'
import TextField from '@material-ui/core/TextField'

const Login = ({ login, isAuthenticated }) => {
  //object & function
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  //destructure
  const { email, password } = formData

  //make a copy ...spread operator
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    login(email, password)
  }

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <section className="container-log">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead"> Sign Into Your Account</p>
        <small style={{ textAlign: 'center' }}>Account: test@test.com </small>
        <small style={{ textAlign: 'center' }}>Password: test123</small>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <TextField
              variant="filled"
              type="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <TextField
              variant="filled"
              type="password"
              label="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>

          <Submit value={'Login'} />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </section>
    </Fragment>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
