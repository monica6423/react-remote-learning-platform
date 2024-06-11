import { setAlert } from './alert'

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  RESET_PROFILE_LOADING,
  GET_PROFILE_TO_EDIT,
  PROFILES_LOAD,
  FILTER_PROFILES,
} from './types'
import { API } from '../api'

//Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
  dispatch({
    type: RESET_PROFILE_LOADING,
  })
  try {
    const res = await API.get('/api/profile/me')
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    //dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Get current users profile for edit

export const getCurrentProfileToEdit = () => async (dispatch) => {
  try {
    const res = await API.get('/api/profile/me')
    dispatch({
      type: GET_PROFILE_TO_EDIT,
      payload: res.data,
    })
  } catch (err) {
    //dispatch({ type: CLEAR_PROFILE });
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  })
  dispatch({
    type: RESET_PROFILE_LOADING,
  })
  try {
    const res = await API.get('/api/profile')
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    })
    console.log(res.data)
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Get all profiles
export const getProfilesLoad = (variables) => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  })
  dispatch({
    type: RESET_PROFILE_LOADING,
  })
  try {
    const res = await API.post('/api/profile/postload', variables)

    console.log(variables)

    if (variables.loadMore) {
      dispatch({
        type: PROFILES_LOAD,
        payload: res.data,
      })
    } else {
      dispatch({
        type: FILTER_PROFILES,
        payload: res.data,
      })
    }
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Get profile by id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await API.get(`/api/profile/user/${userId}`)
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Create or update profile
//history object that has a method called push that will redirect to a client side route
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await API.post('/api/profile', formData, config)
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      })

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'),
      )
      if (!edit) {
        //for creating new profile, use history object and call push method and redirect
        history.push('/dashboard')
      }
    } catch (err) {
      //if forget enter skills etc, it will show an alert
      const errors = err.response.data.errors
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }

//Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await API.put('/api/profile/experience', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Experience Added', 'success'))

    history.push('/dashboard')
  } catch (err) {
    //if forget enter skills etc, it will show an alert
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const res = await API.put('/api/profile/education', formData, config)
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })

    dispatch(setAlert('Education Added', 'success'))

    history.push('/dashboard')
  } catch (err) {
    //if forget enter skills etc, it will show an alert
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await API.delete(`api/profile/experience/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Experience Removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
//Delete education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await API.delete(`api/profile/education/${id}`)

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    })
    dispatch(setAlert('Education Removed', 'success'))
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete account and profile
export const deleteAccount = (_id) => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await API.delete('api/profile/')

      dispatch({
        type: CLEAR_PROFILE,
      })
      dispatch({
        type: ACCOUNT_DELETED,
      })
      dispatch(setAlert('Your account has been permanantly deleted', 'success'))
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      })
    }
  }
}
