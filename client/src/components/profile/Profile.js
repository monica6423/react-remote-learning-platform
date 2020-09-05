import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'   
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import { connect } from 'react-redux';



const Profile = ({ getProfileById, profile: {profile, loading}, auth, match }) => {

    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);

    return (
        <Fragment>
            
            {profile === null || loading ? <Spinner /> : <Fragment><div className="profile-end"></div>
            <div className="back-div">{auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark back-button'>Edit Profile</Link>)}{/* if current profile we are looking at is ours */}
            <Link to='/profiles' className=" btn-light back-button">
            <KeyboardReturnIcon />Back</Link>
            </div>
            

            <div className="main-container">
                <div className="my-profile">
                <ProfileTop profile={profile} />
                </div>

                <div className="my-bio">
                <ProfileAbout profile={profile} />
                <div className="profile-exp profile-common p-2">
                    <h2 className="text-primary">Experience</h2>{profile.experience.length > 0 ? (<Fragment>
                        {profile.experience.map(experience => (
                            <ProfileExperience
                            key={experience._id}
                            experience={experience} />
                        ))}
                    </Fragment>):(<h4>No experience credentials</h4>)}
                </div>

                <div className="profile-edu profile-common p-2">
                    <h2 className="text-primary">Education</h2>{profile.education.length > 0 ? (<Fragment>
                        {profile.education.map(education => (
                            <ProfileEducation
                            key={education._id}
                            education={education} />
                        ))}
                    </Fragment>):(<h4>No education credentials</h4>)}
                </div>

                </div>
            </div>
            
            </Fragment> }
  
        </Fragment>
    )
}

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile);