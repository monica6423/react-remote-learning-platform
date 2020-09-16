import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';

const Post = ({ getPost, post: {post, loading}, match}) => {

    useEffect(() => {
        getPost(match.params.id);
    }, [getPost]);

    return (
        loading || post === null ? <Spinner /> : <Fragment> <section className="container-groups">
         <div className="back-div">
            <Link to='/posts' className=" btn-light back-button">
            <KeyboardReturnIcon />Back</Link>
         </div>
            
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
                {post.comments.map(comment => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id} />
                ))}
            </div>
            </section>
        </Fragment>
    );
}

Post.propTypes = {
    getPost: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);