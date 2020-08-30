import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import DashboardActions from '../dashboard/DashboardActions';
import { connect } from 'react-redux'
import { addExperience } from '../../actions/profile'
import TextField from '@material-ui/core/TextField';
import ToolTip from '../dashboard/ToolTip'

const AddExperience = ({addExperience, history, auth: { user } }) => {
    const [ formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });
    
    const [toDateDisabled, toggleDisabled] = useState(false);
    const { company, title, location, from, to, current, description} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
 

    return (
      
        <Fragment>
        <div className="tooltip">
            <ToolTip/>
          </div>
        <div className="profile-end"></div>
          <h1 className="large text-primary">Add Experience</h1>
          <div className="dashboard">
                  <div className="dash-left">
                      <p className="lead">
                           Welcome! { user && user.name}
                      </p>
                      <DashboardActions />
                  </div>

                  <div className="dash-right">

                    <p className="lead">
                      Add any positions that you have had in the past
                    </p>
                    <form className="form" onSubmit={e => {
                      e.preventDefault();
                      addExperience(formData, history);
                    }}>
                      <div className="form-group">
                        <TextField type="text" label="Job Title" name="title" value={title} onChange={e => onChange(e)} required />
                      </div>
                      <div className="form-group">
                        <TextField type="text" label="Company" name="company" value={company} onChange={e => onChange(e)} required />
                      </div>
                      <div className="form-group">
                        <TextField type="text" label="Location" name="location" value={location} onChange={e => onChange(e)}  />
                      </div>
                      <div className="form-group">
                        <div>From Date</div>
                        <TextField type="date" name="from" value={from} onChange={e => onChange(e)} />
                      </div>
                      <div className="form-group">
                        <p><input type="checkbox" name="current" checked={current} value={current} onChange={e => {setFormData({...formData, current: !current});toggleDisabled(!toDateDisabled)}} /> {' '}Current Job</p>
                      </div>
                      <div className="form-group">
                        <div>To Date</div>
                        <TextField type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisabled ? 'disabled' : ''}/>
                      </div>
                      <div className="form-group">
                        <TextField
                          multiline
                          name="description"
                          label="Job Description"
                          value={description} onChange={e => onChange(e)}
                        />
                      </div>
                      <input type="submit" className="btn btn-primary my-1" />
                    </form>
                  </div>
              </div> 
                  
          </Fragment>
        
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStatetoProps = state => ({
  auth: state.auth
})

export default connect(mapStatetoProps, { addExperience })(AddExperience)
