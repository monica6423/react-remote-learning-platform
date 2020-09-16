import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const CommentItem = ({postId, comment: { _id, text, name, avatar, user, date}, auth, deleteComment, profile: {profiles}}) => {
    return (
        <div class="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${user}`}>
            {profiles.map(profile => (name === profile.user.name && <img key={profile._id} src={profile.photo} className="round-img" />))}
              <h4>{name}</h4>
            </Link>
          </div>
          <div>
            <p class="my-1">
              {text}
            </p>

            <div className="post-down">
            <p class="post-date">
                Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
            {!auth.loading && user === auth.user._id && (
              <Button
                    onClick={e => deleteComment(postId, _id)} 
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >Delete</Button>
                
            )}
            </div>
            
          </div>
        </div>
    );
}

CommentItem.propTypes = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);