import React, { useState, Fragment } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux Actions
import { toggleTimeFormat } from '../redux/actions/uiActions'

// Redux Selectors
import { getTimeFormat } from '../redux/selectors/uiSelectors'
import { getBaseTimezone, getTrackedTimezones, getShareOffset } from '../redux/selectors/dataSelectors'

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

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

const createShareUrl = (base, tracked, offset) => {
  const baseUrl = 'https://timeo-testing.netlify.app/';

  let trackedWithoutIds = tracked.map(item => (item.timezone));

  let trackedParams = trackedWithoutIds.join(',');

  return `${baseUrl}?base=${base}&tracked=${trackedParams.toString()}&offset=${offset}`;
}

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const AM_PM = useSelector(getTimeFormat);
  const base = useSelector(getBaseTimezone);
  const tracked = useSelector(getTrackedTimezones);
  const offset = useSelector(getShareOffset);

  const dispatch = useDispatch();

  const handleShare = () => {
    const shareUrl = createShareUrl(base, tracked, offset);

    if (navigator.share) {
      navigator.share({
        title: "Timeo share!",
        text: "Check out what I'm tracking on Timeo! \n",
        url: shareUrl
      }).then(() => {
        console.log('Thanks for sharing!');
      })
        .catch(err => {
          console.error(`ERROR: `, err.message);
        });
    } else {
      navigator.clipboard.writeText("Check out what I'm tracking on Timeo! \n" + shareUrl);
      // Add a popup to say added to clipboard
      setOpen(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <AppBar
      style={{ backgroundColor: "#ffffff", color: "#000" }}
    >
      <Toolbar >
        <Box>
          <Button color="primary"
            onClick={handleShare}
          >
            SHARE
          </Button>
        </Box>
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
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Share URL copied to clipboard"
        action={
          <Fragment>
            <IconButton size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      />
    </AppBar>
  )
}

export default Navbar
