import React from 'react'

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';

const TealSwitch = withStyles({
  root: {},
  switchBase: {
    color: '#34CCB2',
    '&$checked': {
      color: '#34CCB2',
    },
    '&$checked + $track': {
      backgroundColor: '#EFEEEE',
    },
  },
  thumb: {},
  checked: {},
  track: {
    backgroundColor: '#EFEEEE',
  },
})(Switch);

const Navbar = ({ twentyFoHourFormat, setTwentyFoHourFormat }) => {

  return (
    <AppBar
      style={{ backgroundColor: "#ffffff", color: "#000" }}
    >
      <Toolbar >
        <Box
          display="flex"
          width={1}
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography variant="caption" display="block">
            12 Hour
          </Typography>
          <TealSwitch
            checked={twentyFoHourFormat}
            onChange={e => setTwentyFoHourFormat(e.target.checked)}
            name="Twelve Hour Format"

          />
          <Typography variant="caption" display="block">
            24 Hour
           </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
