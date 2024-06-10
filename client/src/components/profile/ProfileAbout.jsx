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
    <div class="profile-about profile-common bg-light p-2">
      {bio && (
        <Fragment>
          <h2 class="text-primary">{name.trim().split(' ')[0]}'s Bio</h2>
          <p>{bio}</p>
          <div class="line"></div>
        </Fragment>
      )}

      <h2 class="text-primary">Skills</h2>
      <div class="skills">
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
