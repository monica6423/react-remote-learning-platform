import React, { useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import HomeIcon from '@material-ui/icons/Home'
import EditIcon from '@material-ui/icons/Edit'
import WorkIcon from '@material-ui/icons/Work'
import SchoolIcon from '@material-ui/icons/School'
const DashboardActions = ({ location }) => {
  return (
    <div className="dash-buttons">
      <Link
        to="/dashboard"
        className="dash-button "
        style={{
          background:
            location.pathname.toString() === '/dashboard' &&
            'rgb(255, 236, 66)',
          borderRadius: '20px',
          fontWeight: location.pathname.toString() === '/dashboard' && '700',
        }}
      >
        <HomeIcon className="text-primary" /> Home
      </Link>
      <Link
        to="/edit-profile"
        className="dash-button "
        style={{
          background:
            location.pathname.toString() === '/edit-profile' &&
            'rgb(255, 236, 66)',
          borderRadius: '20px',
          fontWeight: location.pathname.toString() === '/edit-profile' && '700',
        }}
      >
        <EditIcon className="text-primary" /> Edit Profile
      </Link>
      <Link
        to="/add-experience"
        className="dash-button "
        style={{
          background:
            location.pathname.toString() === '/add-experience' &&
            'rgb(255, 236, 66)',
          borderRadius: '20px',
          fontWeight:
            location.pathname.toString() === '/add-experience' && '700',
        }}
      >
        <WorkIcon className="text-primary" /> Add Experience
      </Link>
      <Link
        to="/add-education"
        className="dash-button "
        style={{
          background:
            location.pathname.toString() === '/add-education' &&
            'rgb(255, 236, 66)',
          borderRadius: '20px',
          fontWeight:
            location.pathname.toString() === '/add-education' && '700',
        }}
      >
        <SchoolIcon className="text-primary" /> Add Education
      </Link>
    </div>
  )
}

DashboardActions.propTypes = {
  routerprops: PropTypes.object.isRequired,
}

// const mapStateToProps = state => ({
//     profile: state.profile,
//     auth: state.auth

// })

export default withRouter(DashboardActions)
