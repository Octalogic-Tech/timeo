import React, { useState, useEffect } from 'react'

// Redux
import { useSelector, useDispatch } from 'react-redux'

// Redux Actions
import { setOffset } from '../redux/actions/dataActions';

// Redux Selectors
import { getTimeFormat } from '../redux/selectors/uiSelectors'
import { getOffset } from '../redux/selectors/dataSelectors'

// MUI
import { DateTimePicker } from '@material-ui/pickers';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import moment from 'moment'
import momentTZ from 'moment-timezone'
import accurateInterval from 'accurate-interval'

import UpdateModal from './UpdateModal';

const formatTitle = tz => {
  // Splits timezone string
  let title = tz.split('/');
  // Get last word - the location
  title = title[title.length - 1];
  // If location is more than 1 word, format
  title = title.split('_').join(' ');
  return title;
}

const TimeCard = ({ timezone, base, TCId }) => {
  // For modal toggle
  const [open, setOpen] = useState(false);

  const [abbreviation, setAbbreviation] = useState(momentTZ.tz(timezone).zoneAbbr()); //For UI
  const [utcOffset, setUtcOffset] = useState(momentTZ.tz(timezone).format("Z")); //For UI
  const [time, setTime] = useState(momentTZ.tz(timezone)); //For Time calculation

  const offset = useSelector(getOffset);
  const AM_PM = useSelector(getTimeFormat);
  const dispatch = useDispatch();

  // The name of the place
  let title = formatTitle(timezone);

  let night = false;
  let cardStyles = {};
  let borderStyle = { borderRight: '1px solid #000', }

  // Check if night time
  if (time.get('hour') >= 18 || time.get('hour') <= 5) {
    night = true;
    cardStyles.backgroundColor = "#343434";
    cardStyles.color = "#fff";
    borderStyle.borderRight = '1px solid #fff';
  }

  const matches = useMediaQuery('(max-width:600px)');
  if (matches) {
    borderStyle = {};
  }

  const updateTime = value => {
    let diff = value.diff(time);
    dispatch(setOffset(diff));
    // Didnt update value here as it would 
    // effectively update time twice
  }

  useEffect(function updateTimeWithOffset() {
    let newTime = time.add(offset, 'ms');
    setTime(newTime);
    // Incase of re-renders
    dispatch(setOffset(0));
  }, [offset, time, dispatch]);

  useEffect(function updateTimeEveryMinute() {
    const interval = accurateInterval(() => {
      let updatedTime = moment(time.add(1, 'm'));
      setTime(updatedTime);
    }, 60000);

    return () => interval.clear();
  }, [time]);

  // Update time card once timezone changes
  useEffect(function updateTimeCard() {
    setTime(momentTZ.tz(timezone));
    setAbbreviation(momentTZ.tz(timezone).zoneAbbr());
    setUtcOffset(momentTZ.tz(timezone).format("Z"));
  }, [timezone]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card style={cardStyles}>
      <CardContent>
        <Grid container align="center">
          <Grid item xs={12} sm={6}
            onClick={handleOpen}
            style={borderStyle}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height={1}
            >
              <Typography
                variant={base ? "h4" : "h5"}
              >
                {title || "Loading"}
              </Typography>
              <Typography
                variant="body1"
                component="p"
              >
                {abbreviation || "Loading"}
              </Typography>
              <Typography
                color={night ? "inherit" : "textSecondary"}
                variant="body2"
                component="p"
              >
                UTC {utcOffset || "Loading"}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              height={1}
              p={3}
            >
              <DateTimePicker
                value={time}
                onChange={updateTime}
                ampm={!AM_PM}
                format={!AM_PM ? "hh:mm A" : "HH:mm"}
                TextFieldComponent={TimeTextField}
              />
              <br />
              <DateTimePicker
                value={time}
                onChange={updateTime}
                ampm={!AM_PM}
                format="Do MMMM YYYY"
                TextFieldComponent={DateTextField}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>

      <UpdateModal
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        TCId={TCId}
        base={base}
      />
    </Card>
  )
}

const TimeTextField = function (props) {
  return (
    <Typography
      onClick={props.onClick} // do not override
      id={props.id} // do not override
      disabled={props.disabled} // do not override
      {...props.inputProps} // do not override
      variant="h4"
    >
      {props.value}
    </Typography>
  );
};

const DateTextField = function (props) {
  return (
    <Typography
      onClick={props.onClick} // do not override
      id={props.id} // do not override
      disabled={props.disabled} // do not override
      {...props.inputProps} // do not override
      variant="body1"
    >
      {props.value}
    </Typography>
  );
};

export default TimeCard
