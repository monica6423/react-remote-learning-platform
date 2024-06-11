import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ViewButton } from '../layout/ViewButton'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import { useSpring, animated } from 'react-spring'

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
    interests,
    photo,
  },
}) => {
  const [active, setActive] = useState(false)
  //   transition: 'transform 0.1s cubic-bezier(0,.66,1,.36)'
  // });

  const spin = useSpring({
    config: { friction: 5 },
    transform: active ? 'rotate(-15deg)' : 'rotate(0deg)',
  })

  return (
    <animated.div
      className="main-profile"
      onMouseOver={() => setActive(true)}
      onMouseOut={() => setActive(false)}
    >
      <animated.div style={spin} className="ribbon-label">
        {(() => {
          switch (interests) {
            case 1:
              return 'Coding'
            case 2:
              return 'Finance'
            case 3:
              return 'Language'
            case 4:
              return 'Chemistry'
            case 5:
              return 'Art'
          }
        })()}
      </animated.div>
      <h2 className="profile-name">{name}</h2>
      <img src={photo} alt="" className="round-img profile-img" />
      <p className="profile-company">{status} </p>
      <p className="profile-location">
        {' '}
        <LocationOnIcon /> {location && <span>{location}</span>}
      </p>
      <ul className="profile-skill">
        {/* maximun 4 skills from the array */}
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary skill">
            {skill}
          </li>
        ))}
      </ul>
      <Link className="profile-view" to={`/profile/${_id}`}>
        <ViewButton text={'View'} />
      </Link>
    </animated.div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
