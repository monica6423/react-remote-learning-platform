import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { Submit } from "../layout/Submit";
import { motion } from "framer-motion";
import TextField from '@material-ui/core/TextField';



//props
const Register = ({ setAlert, register, isAuthenticated}) => {

    //object & function
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });
    //destructure
    const { name, email, password, password2} = formData;

    //make a copy ...spread operator
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });  

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            //props.setAlert:setAlrt is destucture from from props.setAlert in the register function above
            setAlert('Password do not match', 'danger');
        } else{
            register({ name, email, password});

        }
    };

    //redirect if logged in
    if(isAuthenticated) {
      return <Redirect to='/dashboard' />;
    }

    return (
        <Fragment>
      <section className="container-log">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <TextField 
          variant="filled"
          type="text" 
          label="Name" 
          name="name" 
          value={name} 
          onChange={ e => onChange(e)} 
          //required 
          />
        </div>
        <div className="form-group">
          <TextField 
          variant="filled"
          type="email" 
          label="Email Address" 
          name="email" 
          value={email} 
          onChange={ e => onChange(e)}
          //required
          />
          <small className="form-text"
            >If you want a profile image, <br/>use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <TextField
            variant="filled"
            type="password"
            label="Password"
            name="password"
            //minLength="6"
            value={password} 
            onChange={ e => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <TextField
            variant="filled"
            type="password"
            label="Confirm Password"
            name="password2"
            // minLength="6"
            value={password2} 
            onChange={ e => onChange(e)}
            />
        </div>
        <Submit value={"Register"} />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
      </section>
        </Fragment>
    )
}

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
});

//connect props.setAlert
export default connect(mapStateToProps, { setAlert, register })(Register);
