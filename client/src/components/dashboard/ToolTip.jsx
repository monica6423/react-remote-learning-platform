import React from 'react'

import { Link, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

import HomeIcon from '@material-ui/icons/Home'
import EditIcon from '@material-ui/icons/Edit'
import WorkIcon from '@material-ui/icons/Work'
import SchoolIcon from '@material-ui/icons/School'

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  },
}))

const withLink = (to, children) => <Link to={to}>{children}</Link>

const actions = [
  { icon: withLink('/add-education', <SchoolIcon />), name: 'School' },
  { icon: withLink('/add-experience', <WorkIcon />), name: 'Work' },
  { icon: withLink('/edit-profile', <EditIcon />), name: 'Edit' },
  { icon: withLink('/dashboard', <HomeIcon />), name: 'Home' },
]

function ToolTip() {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <div>
        <SpeedDial
          ariaLabel="SpeedDial example"
          className={classes.speedDial}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </div>
    </div>
  )
}

export default ToolTip
