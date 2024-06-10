import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  GET_PROFILES,
  RESET_PROFILE_LOADING,
  GET_PROFILE_TO_EDIT,
  PROFILES_LOAD,
  FILTER_PROFILES,
} from '../actions/types'

const initialState = {
  //get all of our data //if we visit another users profile page
  profile: null,
  profiles: [],
  postSize: [],
  repos: [],
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      }
    case GET_PROFILE_TO_EDIT:
      return {
        ...state,
        profiles: payload,
        loading: false,
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      }

    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      }

    case RESET_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case PROFILES_LOAD:
      return {
        ...state,
        profiles: [...state.profiles, ...payload.profiles],
        postSize: payload.postSize,
        loading: false,
      }
    case FILTER_PROFILES:
      return {
        ...state,
        profiles: [...payload.profiles],
        postSize: payload.postSize,
        loading: false,
      }
    default:
      return state
  }
}
