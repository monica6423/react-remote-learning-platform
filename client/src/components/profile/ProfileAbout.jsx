import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import DoneAllIcon from '@material-ui/icons/DoneAll'

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about profile-common bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div className="line"></div>
        </Fragment>
      )}

      <h2 className="text-primary">Skills</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <DoneAllIcon /> {skill}
          </div>
        ))}
      </div>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
