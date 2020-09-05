import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { SocialIcon } from 'react-social-icons';
const ProfileTop = ({profile: {
    status,
    company,
    location,
    website,
    social,
    photo,
    user:{name, avatar}
}}) => {
    return (
        <div className="profile-top">
          <img
            className=" my-1"
            src={photo}
            alt=""
          />
          <h1 className="large">{name}</h1>
          <p className="lead">{status} {company && <span> at {company}</span>}</p>
          <p>{location && <span>{location}</span>}</p>
          <div className="icons my-1">
          {
              website && (
                <SocialIcon url={website} />
        
              )
          }
           
           {social && social.twitter && (
     
            <SocialIcon url={social.twitter} />
         
           )}
           {social && social.facebook && (
            <SocialIcon url={social.facebook} />
           )}
           {social && social.linkedin && (
            <SocialIcon url={social.linkedin} />
           )}
           {social && social.youtube && (
            <SocialIcon url={social.youtube} />
           )}
           {social && social.instagram && (
            <SocialIcon url={social.instagram} />
           )}

          </div>
        </div>
    )
}

ProfileTop.propTypes = {
    profile:PropTypes.object.isRequired
}

export default ProfileTop
