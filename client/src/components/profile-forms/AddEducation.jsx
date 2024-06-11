import React, { Fragment, useState } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'
import DashboardActions from '../dashboard/DashboardActions'
import TextField from '@material-ui/core/TextField'
import ToolTip from '../dashboard/ToolTip'

const AddEducation = ({ addEducation, history, auth: { user } }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  })

  const [toDateDisabled, toggleDisabled] = useState(false)
  const { school, degree, fieldofstudy, from, to, current, description } =
    formData
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  return (
    <Fragment>
      <div className="tooltip">
        <ToolTip />
      </div>
      <div className="profile-end"></div>

      <h1 className="large text-primary">Add Education</h1>
      <div className="dashboard">
        <div className="dash-left">
          <p className="lead">Welcome! {user && user.name}</p>
          <DashboardActions />
        </div>

        <div className="dash-right">
          <p className="lead">Add any school or education</p>
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              addEducation(formData, history)
            }}
          >
            <div className="form-group">
              <TextField
                type="text"
                label="School or Education"
                name="school"
                value={school}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                label="Degree or Certificate"
                name="degree"
                value={degree}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <TextField
                type="text"
                label="Field of Study"
                name="fieldofstudy"
                value={fieldofstudy}
                onChange={(e) => onChange(e)}
                required
              />
            </div>
            <div className="form-group">
              <div>From Date</div>
              <TextField
                type="date"
                name="from"
                value={from}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <p>
                <input
                  type="checkbox"
                  name="current"
                  checked={current}
                  value={current}
                  onChange={(e) => {
                    setFormData({ ...formData, current: !current })
                    toggleDisabled(!toDateDisabled)
                  }}
                />{' '}
                Current Study
              </p>
            </div>
            <div className="form-group">
              <div>To Date</div>
              <TextField
                type="date"
                name="to"
                value={to}
                onChange={(e) => onChange(e)}
                disabled={toDateDisabled ? 'disabled' : ''}
              />
            </div>
            <div className="form-group">
              <TextField
                multiline
                name="description"
                label="Program Description"
                value={description}
                onChange={(e) => onChange(e)}
              />
            </div>
            <input type="submit" className="btn btn-primary my-1" />
          </form>
        </div>
      </div>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}
const mapStatetoProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStatetoProps, { addEducation })(
  withRouter(AddEducation),
)
