import React, {useState, Fragment, useEffect} from 'react';
import { Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import DashboardActions from '../dashboard/DashboardActions';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import ToolTip from '../dashboard/ToolTip'

const Interests = [
  {key:1, value:"Coding"},
  {key:2, value:"Finance"},
  {key:3, value:"Language"},
  {key:4, value:"Chemistry"},
  {key:5, value:"Art"},
  {key:6, value:"Medicine"},
  {key:7, value:"Physics"}
]
const EditProfile = ({ profile: { profile, loading}, createProfile, getCurrentProfile, history, auth: { user } }) => {
    const [ formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        interests: 1,
        photo:'',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [ displaySocialInputs, toggleSocialInputs] = useState(false);
    
    useEffect(() => {
      if (!profile) getCurrentProfile();
      if (!loading && profile) {
        setFormData({
          company: loading || !profile.company ? '' : profile.company,
          website: loading || !profile.website ? '' : profile.website,
          location: loading || !profile.location ? '' : profile.location,
          status: loading || !profile.status ? '' : profile.status,
          skills: loading || !profile.skills ? '' : profile.skills.join(','),
          interests: loading || !profile.interests ? '' : profile.interests,
          photo: loading || !profile.photo ? '' : profile.photo,
          bio: loading || !profile.bio ? '' : profile.bio,
          twitter: loading || !profile.social ? '' : profile.social.twitter,
          facebook: loading || !profile.social ? '' : profile.social.facebook,
          linkedin: loading || !profile.social ? '' : profile.social.linkedin,
          youtube: loading || !profile.social ? '' : profile.social.youtube,
          instagram: loading || !profile.social ? '' : profile.social.instagram,
        });
      }
    }, [loading, getCurrentProfile, profile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        interests,
        photo,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
      e.preventDefault();
      createProfile(formData, history, true);
    }

    return (
        <Fragment>
        <div className="tooltip">
            <ToolTip/>
            </div>
        <div className="profile-end"></div> 
        <h1 className="large text-primary">Edit Your Profile</h1>
        <div className="dashboard">
                <div className="dash-left">
                    <p className="lead">
                        Welcome! { user && user.name}
                    </p>
                    <DashboardActions />
                </div>
                
                <div className="dash-right">
            
              <p className="lead">
                Let's get some information to make your
                profile stand out
              </p>
    
              <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                  <TextField select name="status" value={status} onChange={e => onChange(e)}>

                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Junior Developer">Staff</MenuItem>
                    <MenuItem value="Senior Developer">Artist</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                    <MenuItem value="Learning">Learning</MenuItem>
                    <MenuItem value="Instructor">Instructor or Teacher</MenuItem>
                    <MenuItem value="Intern">Intern</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                  <small className="form-text"
                    >Where you are at in your career</small>
                </div>
                <div className="form-group">
                  <TextField select name="interests" value={interests} onChange={e => onChange(e)}>
                    {Interests.map(item => (
                      <MenuItem key={item.key} value={item.key}>{item.value}</MenuItem>
                    ))}
                  </TextField>
                  <small className="form-text"
                    >What are you interested in...</small>
                </div>
                <div className="form-group">
                  <TextField type="text" label="photo URL" name="photo" value={photo} onChange={e => onChange(e)} />
                  <small className="form-text">Enter a URL for a profile photo</small>
                </div>
                <div className="form-group">
                  <TextField type="text" label="Company" name="company" value={company} onChange={e => onChange(e)} />
                  <small className="form-text"
                    >Company you work for or school</small>
                </div>
                <div className="form-group">
                  <TextField type="text" label="Website" name="website" value={website} onChange={e => onChange(e)} />
                  <small className="form-text"
                    >Your own website</small>
                </div>
                <div className="form-group">
                  <TextField type="text" label="Location" name="location" value={location} onChange={e => onChange(e)}  />
                  <small className="form-text"
                    >City & state suggested (eg. Boston, MA)</small>
                </div>
                <div className="form-group">
                  <TextField type="text" label="* Skills" name="skills" value={skills} onChange={e => onChange(e)}  />
                  <small className="form-text"
                    >Please use comma separated values (eg.
                    English, React, Finance)</small>
                </div>
                <div className="form-group">
                  <TextField multiline label="A short bio of yourself" name="bio" value={bio} onChange={e => onChange(e)} />
                  <small className="form-text">Tell us a little about yourself</small>
                </div>
                    
                <div className="my-2">
                <Fab onClick={() => toggleSocialInputs(!displaySocialInputs)} size="small" className="text-primary" aria-label="add" >
                <AddIcon />
                </Fab>
                <span >  Add Social Network Links (Optional)</span>
        
                </div>
                    
                {displaySocialInputs && <Fragment>
                
                  <div className="form-group social-input">
                  <i className="fab fa-twitter fa-2x"></i>
                  <TextField type="text" label="Twitter URL" name="twitter" value={twitter} onChange={e => onChange(e)} />
                </div>
                
                <div className="form-group social-input">
                  <i className="fab fa-facebook fa-2x"></i>
                  <TextField type="text" label="Facebook URL" name="facebook" value={facebook} onChange={e => onChange(e)} />
                </div>
                
                <div className="form-group social-input">
                  <i className="fab fa-youtube fa-2x"></i>
                  <TextField type="text" label="YouTube URL" name="youtube" value={youtube} onChange={e => onChange(e)} />
                </div>
                
                <div className="form-group social-input">
                  <i className="fab fa-linkedin fa-2x"></i>
                  <TextField type="text" label="Linkedin URL" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                </div>
                
                <div className="form-group social-input">
                  <i className="fab fa-instagram fa-2x"></i>
                  <TextField type="text" label="Instagram URL" name="instagram" value={instagram} onChange={e => onChange(e)} />
                </div>
                
                </Fragment>}
                
                <input type="submit" className="btn btn-primary my-1" />
                </form>
               
                </div>
            </div> 
          

        </Fragment>
    )
}

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired

};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth

})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));
