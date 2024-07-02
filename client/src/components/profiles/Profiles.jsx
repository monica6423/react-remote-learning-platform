import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import SpinnerProfiles from '../layout/SpinnerProfiles'
import { useSpring, animated } from 'react-spring'
import ProfileItem from './ProfileItem'
import { getProfilesLoad } from '../../actions/profile'
import { connect } from 'react-redux'
import CheckBox from '../layout/CheckBox'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const theme = createTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
})

const Profiles = ({ getProfilesLoad, profile: { profiles }, postSize }) => {
  // console.log(profiles.length);
  const [Profilesload, setProfilesload] = useState([])
  const [Skip, setSkip] = useState(0)
  const [Limit, setLimit] = useState(6)
  const [PostSize, setPostSize] = useState(0)
  const [Filters, setFilters] = useState({
    interest: [],
  })
  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit,
    }

    getProfilesLoad(variables)

    setPostSize(postSize)
  }, [getProfilesLoad])

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters,
    }
    setFilters(filters)
    getProfilesLoad(variables)
    setSkip(0)
  }
  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters }
    newFilters[category] = filters

    showFilteredResults(newFilters)
  }

  const onLoadMore = () => {
    let skip = Skip + Limit

    const variables = {
      skip: skip,
      limit: Limit,
      loadMore: true,
      filters: Filters,
    }

    getProfilesLoad(variables)
    setSkip(skip)
  }

  /*Parallax*/
  const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
  const trans1 = (x, y) => `translate3d(${x / 10.5}px,${y / 10 + 50}px,0)`
  const trans2 = (x, y) => `translate3d(${x / 5.5}px,${y / 8 + 70}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 8.5}px,${y / 6 + 50}px,0)`
  const trans4 = (x, y) => `translate3d(${x / 9.5}px,${y / 10 + 50}px,0)`

  const [props, setPara] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 1, tension: 280, friction: 120 },
  }))

  return (
    <Fragment>
      <div className="buddy-cover"></div>
      <section className="container">
        <div
          className="buddy-box"
          onMouseMove={({ clientX: x, clientY: y }) =>
            setPara({ xy: calc(x, y) })
          }
        >
          <div className="left-buddy">
            <div>
              <div>BROWSE AND CONNECT</div>
              <div>WITH YOUR BUDDIES</div>
            </div>
          </div>

          <div className="right-buddy">
            <animated.div
              className="buddy1 buddy"
              style={{ transform: props.xy.interpolate(trans1) }}
            />
            <animated.div
              className="buddy2 buddy"
              style={{ transform: props.xy.interpolate(trans2) }}
            />
            <animated.div
              className="buddy3 buddy"
              style={{ transform: props.xy.interpolate(trans3) }}
            />
            <animated.div
              className="buddy4 buddy"
              style={{ transform: props.xy.interpolate(trans4) }}
            />
          </div>
        </div>

        <div className="filter-logan">
          Looking for people who are interested in...
        </div>
        <div className="filter-icon">
          <CheckBox
            handleFilters={(filters) => handleFilters(filters, 'interests')}
          />
        </div>
        <div className="profiles">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <ProfileItem key={profile._id} profile={profile} />
            ))
          ) : (
            <SpinnerProfiles />
          )}
        </div>
        {postSize >= Limit && (
          <div
            style={{
              display: 'flex',
              marginTop: '20px',
              justifyContent: 'center',
            }}
          >
            <ThemeProvider theme={theme}>
              <Button onClick={onLoadMore}>Load More</Button>
            </ThemeProvider>
          </div>
        )}
      </section>
      <div className="footer">
        <p>For Personal Project only 2020</p>
        <p>Profile photos from Unsplash, designed by Adobe XD, unDraw</p>
      </div>
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfilesLoad: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  postSize: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  postSize: state.profile.postSize,
})
export default connect(mapStateToProps, { getProfilesLoad })(Profiles)
