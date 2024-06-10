import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteEducation } from '../../actions/profile'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>

      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <Button
          onClick={() => deleteEducation(edu._id)}
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </td>
    </tr>
  ))

  return (
    <Fragment>
      <div className="lead">My Education</div>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th className="hide-sm">Years</th>
            <th className="hide-sm" />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  )
}

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education)
