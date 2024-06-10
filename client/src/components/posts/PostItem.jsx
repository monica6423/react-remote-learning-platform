import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, deletePost } from '../../actions/post'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownIcon from '@material-ui/icons/ThumbDown'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import MessageIcon from '@material-ui/icons/Message'

const PostItem = ({
  profile: { profiles },
  deletePost,
  addLike,
  removeLike,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => {
  return (
    <div className="post p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          {profiles.map(
            (profile) =>
              name === profile.user.name && (
                <img
                  key={profile._id}
                  src={profile.photo}
                  className="round-img"
                />
              ),
          )}
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="group-text">{text}</p>

        <div className="post-down">
          <p className="post-date">
            Group started on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>

          <div className="post-index">
            {showActions && (
              <Fragment>
                <button
                  onClick={(e) => addLike(_id)}
                  type="button"
                  className="thumb-up discussion"
                >
                  <div style={{ width: '50px' }}>
                    {likes.length > 0 && (
                      <span className="comment-count">{likes.length}</span>
                    )}
                  </div>
                  <ThumbUpIcon />{' '}
                </button>

                <Link to={`/posts/${_id}`} className="discussion">
                  {comments.length > 0 && (
                    <div style={{ width: '100%' }}>
                      <span className="comment-count">{comments.length}</span>
                    </div>
                  )}
                  <MessageIcon />
                  <span class="tooltiptext">Join Group</span>
                </Link>
                {!auth.loading && user === auth.user._id && (
                  <Button
                    onClick={(e) => deletePost(_id)}
                    variant="contained"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

PostItem.defaultProps = {
  showActions: true,
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { deletePost, addLike })(PostItem)
