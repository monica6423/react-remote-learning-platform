import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import Logo from '../../img/logo.png'
import './hamburger.css'

window.addEventListener('scroll', function () {
  if (document.documentElement.scrollTop > 250) {
    document.getElementById('logo').classList.add('smallPanel')
    document.getElementById('navbar').classList.add('smallNavbar')
  } else {
    document.getElementById('logo').classList.remove('smallPanel')
    document.getElementById('navbar').classList.remove('smallNavbar')
  }
})

//destructure props auth => state.auth.isAuthenticated  state.auth.loading
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className="navbar-nav">
      <li className="nav-link">
        <Link
          to="/profiles"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          Buddies
        </Link>
      </li>
      <li className="nav-link">
        <Link
          to="/learnings"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          Books
        </Link>
      </li>
      <li className="nav-link">
        <Link
          to="/posts"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          Groups
        </Link>
      </li>
      <li className="nav-link">
        <Link
          to="/dashboard"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          {/* <i className="fas fa-user"></i> {' '} */}
          <span>Home</span>
        </Link>
      </li>
      <li className="nav-link">
        <Link to="/" onClick={logout}>
          {/* <i className="fas fa-user"></i> {' '} */}
          <span>Logout</span>
        </Link>
      </li>
    </ul>
  )
  const guestLinks = (
    <ul className="navbar-nav">
      <li type="submit" className="nav-link">
        <Link
          to="/profiles"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          Buddies
        </Link>
      </li>
      <li className="nav-link">
        <Link
          to="/learnings"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          Books
        </Link>
      </li>
      <li type="submit" className="nav-link">
        <Link
          to="/login"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          Groups
        </Link>
      </li>

      <li type="submit" className="nav-link">
        <Link
          to="/register"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          Signup
        </Link>
      </li>

      <li type="submit" className="nav-link">
        <Link
          to="/login"
          onClick={() => {
            document.getElementById('menu-btn').checked = false
          }}
        >
          Login
        </Link>
      </li>
    </ul>
  )
  return (
    <Fragment>
      <input type="checkbox" className="menu-btn" id="menu-btn" />
      <label htmlFor="menu-btn" className="menu-icon" style={{ zIndex: '100' }}>
        <span className="menu-icon_line"></span>
      </label>

      <nav id="navbar">
        <h1>
          <Link
            to="/"
            style={{
              height: '0px',
              lineHeight: '0px',
              fontSize: '0px',
              padding: '0px',
              margin: '0px',
            }}
          >
            <img id="logo" src={Logo} alt="full size image" />
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </Fragment>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})
export default connect(mapStateToProps, { logout })(Navbar)
