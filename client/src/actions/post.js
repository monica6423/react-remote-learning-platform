import { setAlert } from './alert'
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from './types'
import { API } from '../api'

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await API.get('/api/posts')

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await API.put(`/api/posts/like/${id}`)

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await API.delete(`/api/posts/${id}`)

    dispatch({
      type: DELETE_POST,
      payload: id,
    })
    dispatch(setAlert('Post Removed', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Add post

export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  try {
    const res = await API.post('/api/posts/', formData, config)

    dispatch({
      type: ADD_POST,
      payload: res.data,
    })
    dispatch(setAlert('Post Created', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await API.get(`/api/posts/${id}`)

    dispatch({
      type: GET_POST,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    header: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await API.post(`/api/posts/comment/${postId}`, formData, config)

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    })

    dispatch(setAlert('Comment added', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await API.delete(`/api/posts/comment/${postId}/${commentId}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    })

    dispatch(setAlert('Comment removed', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
