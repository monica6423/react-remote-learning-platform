import React from 'react';
import PostItem from './PostItem';

const Post = ({ posts }) => {
  return (
    <div className="posts">
        {posts.map(post => (
            <PostItem key={post._id} post={post} />
            ))}
    </div>
  );
};

export default Post;