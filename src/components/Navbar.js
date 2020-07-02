import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { toggleTimeFormat } from '../redux/actions/uiActions'

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

const Navbar = () => {
  const AM_PM = useSelector(state => state.UI.twentyFourHour);
  const dispatch = useDispatch();

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
            checked={AM_PM}
            onClick={() => dispatch(toggleTimeFormat())}
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
