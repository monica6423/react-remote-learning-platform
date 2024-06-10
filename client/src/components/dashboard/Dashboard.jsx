import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Spinner from '../layout/Spinner'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { getCurrentProfile, deleteAccount } from '../../actions/profile'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import ToolTip from './ToolTip'
import Nofound from '../../img/nofound.png'

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  // if profile is null and still loading return spinner
  return loading && profile === null ? (
    <section className="container">
      {' '}
      <Spinner />{' '}
    </section>
  ) : (
    <Fragment>
      <div className="profile-end"></div>
      <h1 className="large text-primary">Home</h1>

      {profile !== null ? (
        <Fragment>
          <div className="tooltip">
            <ToolTip />
          </div>

          <div className="dashboard">
            <div className="dash-left">
              <p className="lead">Welcome! {user && user.name}</p>
              <DashboardActions />
            </div>

            <div className="dash-right">
              <div>
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div className="my-2 buttons">
                  <Button
                    onClick={() => deleteAccount()}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete My Account
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          {' '}
          <section className="container-log">
            <img
              style={{ width: '50%', alignSelf: 'center' }}
              src={Nofound}
              alt=""
            />

            <p>You have not yet setup a profile. Please add some info.</p>
            <Link
              to="/create-profile"
              className="btn btn-primary"
              style={{ margin: '10px auto' }}
            >
              Create Profile
            </Link>
          </section>
        </Fragment>
      )}
    </Fragment>
  )
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}
const mapStatetoProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStatetoProps, { getCurrentProfile, deleteAccount })(
  Dashboard,
)
