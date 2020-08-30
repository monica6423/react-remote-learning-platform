import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const  Dashboard = ({
    getCurrentProfile,
    auth: { user }, 
    profile: { profile, loading } 

}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
        <div>
            
        </div>
    )
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStatetoProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStatetoProps, { getCurrentProfile })(Dashboard);
