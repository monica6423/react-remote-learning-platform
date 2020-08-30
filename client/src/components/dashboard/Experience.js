import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const Experience = ({ experience, deleteExperience }) => {
    
    const experiences = experience.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td>{exp.title}</td>

            <td className="hide-sm">
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null ? ('Now') : (<Moment format="YYYY/MM/DD">{exp.to}</Moment>)}
            </td>
            <td>
            <Button
                onClick={() => deleteExperience(exp._id)} 
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
            >
                Delete
            </Button>
                
            </td>
        </tr>
    ));
    
    return (
        <Fragment>
        <div className="lead">My Experience </div>
        <table className="table">
            <thead>
                <tr>
                    <th>Company</th>
                    <th className="hide-sm">Title</th>
                    <th >Years</th>
                    <th  className="hide-sm"/>
                </tr>
            </thead>
            <tbody>{experiences}</tbody>
        </table>
        </Fragment>
    )
}

Experience.propTypes = {
    experience: PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired
}

export default connect(null, {deleteExperience})(Experience);